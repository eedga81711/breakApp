// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// //primeReact
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { ProductService } from "../../service/ProductService";

// //toast imports
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// const notify = () => {
//   toast.success("let's chat");
// };

// const OrderHistory = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     ProductService.getProductsMini().then((data) => setProducts(data));
//   }, []);

//   return (
//     <div className="surface-ground px-2 py-1 md:px-4 lg:px-6">
//       <div className="grid">
//         <div
//           className={`rounded button-yellow mb-1 self-end text-[14px] col-12`}
//         >
//           <Link
//             to="/Admin/Dashboard/users/"
//             className="flex justify-evenly w-full py-1"
//           >
//             <span className="text-black">Add New Product</span>
//           </Link>
//         </div>

//         <div className="card p-2 col-12">
//           <DataTable
//             value={products}
//             showGridlines
//             tableStyle={{ minWidth: "50rem" }}
//           >
//             <Column field="code" header="Code"></Column>
//             <Column field="name" header="Name"></Column>
//             <Column field="category" header="Category"></Column>
//             <Column field="quantity" header="Quantity"></Column>
//           </DataTable>
//         </div>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default OrderHistory;

/* eslint-disable no-unused-vars */
import * as React from "react";
import { Link } from "react-router-dom";

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

function createData(id, name, product, price, status, timestamps) {
  const orderStatus = (status) => {
    if (status === "served") {
      return {
        background: "cyan",
        color: "black",
      };
    } else if (status === "pending") {
      return {
        background: "#f7b900",
        color: "white",
      };
    } else if (status === "declined") {
      return {
        background: "red",
        color: "white",
      };
    } else {
      return {
        background: "transparent",
        color: "black",
      };
    }
  };

  const { background, color } = orderStatus(status);

  return {
    id,
    name,
    product,
    price,
    status,
    background: background,
    color: color,
    timestamps,
  };
}

const date = new Date();
const formattedDate = date.toLocaleDateString({
  weekday: "numeric",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  timestamps: "numeric",
});

const rows = [
  createData(1, "edgar", "banana", 1000, "served", formattedDate),
  createData(2, "sam", "samosa", 2000, "pending", formattedDate),
  createData(3, "allan", "chapati", 600, "declined", formattedDate),
  createData(4, "denno", "sausage", 1500, "pending", formattedDate),
  createData(5, "peter", "rolex", 700, "declined", formattedDate),
  createData(6, "paul", "rolex", 1600, "served", formattedDate),
  createData(7, "robert", "pancakes", 1000, "pending", formattedDate),
  createData(8, "sharon", "pancakes", 1500, "served", formattedDate),
  createData(9, "daniel", "banana", 2000, "served", formattedDate),
  createData(10, "hope", "shortcakes", 1000, "served", formattedDate),
  createData(11, "aaron", "cassava", 1000, "pending", formattedDate),
  createData(12, "aariela", "eggs", 2000, "pending", formattedDate),
  createData(13, "leticia", "cassava", 1000, "declined", formattedDate),
];

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
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Order Owner",
  },
  {
    id: "product",
    numeric: true,
    disablePadding: false,
    label: "Product Name",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Total Price",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "timestamps",
    numeric: true,
    disablePadding: false,
    label: "Time Of Order",
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
      <TableRow className="bg-cyan">
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
          Order History...
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
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
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <div className="surface-ground px-2 py-1 md:px-4 lg:px-6 ">
      <div className="grid mt-2">
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
                  rowCount={rows.length}
                />
                <TableBody>
                  {visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
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
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.product}</TableCell>
                        <TableCell align="center">{row.price}</TableCell>
                        <TableCell align="center" className="relative">
                          {" "}
                          <span>
                            <span
                              style={{
                                backgroundColor: row.background,
                              }}
                              className="status"
                            ></span>
                            {row.status}
                          </span>
                        </TableCell>
                        <TableCell align="center">{row.timestamps}</TableCell>
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
              count={rows.length}
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
      </div>
    </div>
  );
}
