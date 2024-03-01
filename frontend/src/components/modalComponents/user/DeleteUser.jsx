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
import { deleteUserUrl } from "../../../constants";
import PropTypes from "prop-types";

function DeleteUser({ selectedUserData, fetchData }) {
  const { openDeleteUser, setOpenDeleteUser, user, setUser } =
    useContext(ModalContext);

  const [deleteUser, setDeleteUser] = useState(null);

  const handleCloseDelete = () => {
    setOpenDeleteUser(false);
  };

  DeleteUser.propTypes = {
    selectedUserData: PropTypes.object,
    fetchData: PropTypes.func,
  };

  const handleSubmit = async (userId) => {
    console.log("attempting to delete developer:", selectedUserData);

    const res = await axios.delete(`${deleteUserUrl}?userId=${userId}`);

    try {
      if (res.status === 202) {
        setUser((prevUser) =>
          prevUser.filter((user) => user.userId !== userId)
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
    handleCloseDelete();
  };

  return (
    <div>
      <Dialog open={openDeleteUser} style={{ zIndex: 9999 }}>
        <DialogTitle className="flex justify-between">
          <span>Delete User</span>
          <div
            onClick={handleCloseDelete}
            className="bg-black rounded-full p-2 w-[28px] h-[28px] items-center flex"
          >
            <img src={close} alt="close" className="w-[24px] h-[24px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex gap-4">
            <p>Are you sure you want to delete this user ?</p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDelete}
            color="primary"
            variant="contained"
            style={{ background: "cyan", color: "black" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleSubmit(selectedUserData.userId)}
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

export default DeleteUser;
