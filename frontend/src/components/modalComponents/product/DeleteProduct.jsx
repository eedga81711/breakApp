/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import Button from "@mui/material/Button";

import { ModalContext } from "../../../contexts/ModalContext";
import { close } from "../../../assets";
import axios from "axios";
import { deletePdtUrl_admin } from "../../../constants";
import PropTypes from "prop-types";

function DeleteProduct({ selectedPdtData, fetchData }) {
  const { openDeletePdt, setOpenDeletePdt, product, setProduct } =
    useContext(ModalContext);

  const [deleteUser, setDeleteUser] = useState(null);

  const handleClickOpen = () => {
    setOpenDeletePdt(true);
  };

  const handleClose = () => {
    setOpenDeletePdt(false);
  };

  DeleteProduct.propTypes = {
    selectedPdtData: PropTypes.object,
    fetchData: PropTypes.func,
  };

  const handleSubmit = async (productId) => {
    const res = await axios.delete(
      `${deletePdtUrl_admin}?productId=${productId}`
    );

    try {
      if (res.status === 202) {
        setProduct((prevPdt) =>
          prevPdt.filter((product) => product.productId !== productId)
        );
      } else {
        console.error(
          "Failed to delete user from express_db:",
          res.data.message
        );
      }
    } catch (error) {
      if (error.response) {
        console.error(
          "Error deleting user from express_db:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }

    fetchData();
    handleClose();
  };

  return (
    <div>
      <Dialog open={openDeletePdt} style={{ zIndex: 9999 }}>
        <DialogTitle className="flex justify-between">
          <span>Delete Product</span>
          <div
            onClick={handleClose}
            className="bg-black rounded-full p-2 w-[28px] h-[28px] items-center flex"
          >
            <img src={close} alt="close" className="w-[24px] h-[24px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex gap-4">
            <p>Are you sure you want to delete this product ?</p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            variant="contained"
            style={{ background: "cyan", color: "black" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleSubmit(selectedPdtData.productId)}
            color="primary"
            variant="contained"
            style={{ background: "yellow", color: "black" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteProduct;
