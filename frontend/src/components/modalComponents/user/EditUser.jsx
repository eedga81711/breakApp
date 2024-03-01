// /* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";

import { ModalContext } from "../../../contexts/ModalContext";
import { close } from "../../../assets";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import axios from "axios";

import { editUserUrl } from "../../../constants";
import PropTypes from "prop-types";

function EditUser({ selectedUserData, fetchData }) {
  const {
    openEditUser,
    setOpenEditUser,
    editUser,
    setEditUser,
    validated,
    setValidated,
  } = useContext(ModalContext);

  //handling userForm data
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editCompany, setEditCompany] = useState("");
  const [editUserType, setEditUserType] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editImg, setEditImg] = useState("");

  EditUser.propTypes = {
    selectedUserData: PropTypes.object,
    fetchData: PropTypes.func,
  };

  useEffect(() => {
    // console.log("Selected User Data:", selectedUserData);
    if (selectedUserData) {
      setEditName(selectedUserData.name || "");
      setEditEmail(selectedUserData.email || "");
      setEditCompany(selectedUserData.company || "");
      setEditUserType(selectedUserData.userType || "");
      setEditStatus(selectedUserData.status || "");
      setEditImg(selectedUserData.img || "");
    }
  }, [selectedUserData]);

  const handleCloseEdit = () => {
    setOpenEditUser(false);
  };

  const updateEditUser = (newValues) => {
    setEditUser((prevEditUser) => ({ ...prevEditUser, ...newValues }));
  };

  const userRef = useRef("null");

  const schema = Yup.object().shape({
    name: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    company: Yup.string().required("Company is required"),
    userType: Yup.string().required("User Type is required"),
    status: Yup.string().required("User Status is required"),
    // img: Yup.string().required("User is required"),
  });

  const handleSubmit = async (values, userId) => {
    const form = userRef.current;

    if (form && form.checkValidity() === true) {
      const updatedUser = { ...editUser, ...values };
      const res = await axios.patch(
        `${editUserUrl}?userId=${userId}`,
        updatedUser
      );

      form.reset();
      setValidated(false);

      try {
        if (res.status === 202) {
          if (editUser && userId) {
            updateEditUser(values);
          } else {
            setEditUser(values);
          }
          setEditUser(null);
        } else {
          setValidated(true);
          console.error("Failed to edit user:", res.data.message);
        }
      } catch (error) {
        console.error("Error adding user to database", error.message);
        console.error("Error details:", error);
        throw error;
      }
    } else {
      setValidated(true);
    }

    console.log("Submitted value:", values);
    handleCloseEdit();
    fetchData();
  };

  return (
    <div>
      <Dialog open={openEditUser} style={{ zIndex: 0 }}>
        <Formik
          initialValues={{
            name: selectedUserData?.name || "",
            email: selectedUserData?.email || "",
            company: selectedUserData?.company || "",
            userType: selectedUserData?.userType || "",
            status: selectedUserData?.status || "",
            img: selectedUserData?.img || "",
          }}
          validationSchema={schema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values, selectedUserData.userId);
            setSubmitting(false);
          }}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <Form
              noValidate
              validated={validated.toString()}
              ref={userRef}
              autoComplete="off"
            >
              <DialogTitle className="flex justify-between">
                <span>Edit User</span>
                <div
                  onClick={handleCloseEdit}
                  className="bg-black rounded-full p-2 w-[28px] h-[28px] items-center flex"
                >
                  <img src={close} alt="close" className="w-[24px] h-[24px]" />
                </div>
              </DialogTitle>

              <DialogContent>
                <div className="flex gap-4">
                  <FormControl autoFocus fullWidth margin="dense">
                    <TextField
                      required
                      autoFocus
                      margin="dense"
                      id="name"
                      name="name"
                      label="Username"
                      type="text"
                      fullWidth
                      value={editName}
                      onChange={(e) => {
                        handleChange(e);
                        setEditName(e.target.value);
                      }}
                      error={touched.name && !!errors.name}
                    />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="text-red-600"
                    />
                  </FormControl>

                  <FormControl autoFocus fullWidth margin="dense">
                    <TextField
                      required
                      autoFocus
                      margin="dense"
                      id="email"
                      name="email"
                      label="E-mail"
                      type="email"
                      fullWidth
                      value={editEmail}
                      onChange={(e) => {
                        handleChange(e);
                        setEditEmail(e.target.value);
                      }}
                      error={touched.email && !!errors.email}
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-red-600"
                    />
                  </FormControl>
                </div>

                <div className="flex gap-4">
                  <FormControl autoFocus fullWidth margin="dense">
                    <InputLabel id="company-label">Company</InputLabel>
                    <Select
                      labelId="company-label"
                      id="company"
                      name="company"
                      value={editCompany}
                      label="Company"
                      onChange={(e) => {
                        handleChange(e);
                        setEditCompany(e.target.value);
                      }}
                      error={touched.company && !!errors.company}
                    >
                      <MenuItem value={"Odyssey"}>Odyssey</MenuItem>
                      <MenuItem value={"Upti"}>Upti</MenuItem>
                    </Select>
                    <ErrorMessage
                      name="company"
                      component="p"
                      className="text-red-600"
                    />
                  </FormControl>

                  <FormControl autoFocus fullWidth margin="dense">
                    <InputLabel id="type-label">User Type</InputLabel>
                    <Select
                      labelId="type-label"
                      id="userType"
                      name="userType"
                      value={editUserType}
                      label="User Type"
                      onChange={(e) => {
                        handleChange(e);
                        setEditUserType(e.target.value);
                      }}
                      error={touched.userType && !!errors.userType}
                    >
                      {/* <MenuItem value="">Select User Type</MenuItem> */}
                      <MenuItem value={"SuperAdmin"}>SuperAdmin</MenuItem>
                      <MenuItem value={"Admin"}>Admin</MenuItem>
                      <MenuItem value={"User"}>User</MenuItem>
                    </Select>
                    <ErrorMessage
                      name="userType"
                      component="p"
                      className="text-red-600"
                    />
                  </FormControl>
                </div>

                <div className="flex gap-4">
                  <FormControl autoFocus fullWidth margin="dense">
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                      labelId="status-label"
                      id="status"
                      name="status"
                      value={editStatus}
                      label="Status"
                      onChange={(e) => {
                        handleChange(e);
                        setEditStatus(e.target.value);
                      }}
                      error={touched.status && !!errors.status}
                    >
                      <MenuItem value={"Active"}>Active</MenuItem>
                      <MenuItem value={"Inactive"}>Inactive</MenuItem>
                      <MenuItem value={"Suspended"}>Suspended</MenuItem>
                    </Select>
                    <ErrorMessage
                      name="status"
                      component="p"
                      className="text-red-600"
                    />
                  </FormControl>

                  <FormControl autoFocus fullWidth margin="dense">
                    <TextField
                      autoFocus
                      margin="dense"
                      id="img"
                      name="img"
                      type="file"
                      fullWidth
                      onChange={(e) => {
                        handleChange(e);
                        setEditImg(e.target.value);
                      }}
                    />

                    {/* error={touched.img && !!errors.img} */}
                    {/* <ErrorMessage
                      name="img"
                      component="p"
                      className="text-red-600"
                    /> */}
                  </FormControl>
                </div>
              </DialogContent>

              <DialogActions>
                <Button
                  onClick={handleCloseEdit}
                  color="primary"
                  variant="contained"
                  style={{ background: "cyan", color: "black" }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  style={{ background: "yellow", color: "black" }}
                >
                  Save
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}

export default EditUser;
