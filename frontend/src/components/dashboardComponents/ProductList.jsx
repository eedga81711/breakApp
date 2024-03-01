// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// const notify = () => {
//   toast.success("let's chat");
// };

/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";

//material imports
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Button } from "@mui/material";

//context imports
import { ModalContext } from "../../contexts/ModalContext";

import { CreateProduct, DeleteProduct, EditProduct } from "../modalComponents";
import axios from "axios";
import { getPdtUrl_admin, baseUrl } from "../../constants";

function createData(id, img, name, unitPrice, timestamps, actions, adminId) {
  return {
    id,
    img,
    name,
    unitPrice,
    timestamps,
    actions,
    adminId,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "PdtId",
  },
  {
    id: "img",
    numeric: true,
    disablePadding: false,
    label: "Pdt Image",
  },
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "Pdt Name",
  },
  {
    id: "unitPrice",
    numeric: true,
    disablePadding: false,
    label: "Price (shs.)",
  },
  {
    id: "adminId",
    numeric: true,
    disablePadding: false,
    label: "Admin ID",
  },
  {
    id: "timestamps",
    numeric: true,
    disablePadding: false,
    label: "Time Added",
  },
  {
    id: "actions",
    numeric: true,
    disablePadding: false,
    label: "Actions",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className="bg-yellow">
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? "right" : "left"}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  //context
  const { setOpenDeletePdt } = useContext(ModalContext);

  const handleClickDelete = () => {
    console.log("dialog opened");
    setOpenDeletePdt(true);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Product List...
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleClickDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState(""); //add price as a property
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = React.useState([]);

  const formatTimestamp = (updatedAt) => {
    const date = new Date(updatedAt);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(getPdtUrl_admin);

      const productsWithDataAndImages = res.data.products.map((product) => ({
        ...product,
        img: product.img ? `${baseUrl}/images/${product.img}` : null, // Assuming the backend serves images at /api route
      }));
      setData(productsWithDataAndImages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(data, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, data]
  );

  //context
  const { setOpenCreatePdt, setOpenEditPdt } = useContext(ModalContext);

  const [selectedPdtData, setSelectedPdtData] = useState(null);
  const handleRowClick = (pdtData) => {
    setSelectedPdtData(pdtData);
  };

  const handleClickOpen = () => {
    console.log("create Pdt opened");
    setOpenCreatePdt(true);
  };

  const handleClickEdit = (pdtData) => {
    console.log("edit Pdt opened");
    setOpenEditPdt(true);
    setSelectedPdtData(pdtData);
  };

  return (
    <div className="surface-ground px-0 py-1 md:px-4 lg:px-6 ">
      <div className="flex flex-col">
        <div className="flex justify-end items-end p-0 gap-10">
          <div
            className={`rounded button-yellow pdt mb-1 text-[14px] text-center py-2 col-12`}
            onClick={handleClickOpen}
          >
            <span className="text-black w-full">Add New Product</span>
          </div>
        </div>

        <Box sx={{ width: "100%" }} c="true">
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={data.length}
                />
                <TableBody>
                  {visibleRows.map((row) => {
                    const isItemSelected = isSelected(row.productId);
                    const labelId = `enhanced-table-checkbox-${row.productId}`;

                    const centeredImageStyle = {
                      display: "block",
                      margin: "auto",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    };

                    return (
                      <TableRow
                        hover
                        onClick={(event) => {
                          handleClick(event, row.productId);
                          handleRowClick(row);
                        }}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.productId}
                        selected={isItemSelected}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          {row.productId}
                        </TableCell>
                        <TableCell align="center">
                          {row.img && (
                            <img
                              src={row.img}
                              alt={row.name}
                              style={centeredImageStyle}
                            />
                          )}
                        </TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.unitPrice}</TableCell>
                        <TableCell align="center">{row.adminId}</TableCell>
                        <TableCell align="center">
                          {formatTimestamp(row.updatedAt)}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            style={{ background: "yellow", color: "black" }}
                            variant="contained"
                            size="xs"
                            onClick={handleClickEdit}
                          >
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 20 : 30) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          />
        </Box>

        <CreateProduct fetchData={fetchData} />
        <DeleteProduct
          fetchData={fetchData}
          selectedPdtData={selectedPdtData}
        />
        <EditProduct fetchData={fetchData} selectedPdtData={selectedPdtData} />
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}
