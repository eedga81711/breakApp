/* eslint-disable no-unused-vars */
import React, { useContext, useRef } from "react";
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
  Input,
} from "@mui/material";

import { ModalContext } from "../../../contexts/ModalContext";
import { close } from "../../../assets";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import axios from "axios";

import { createPdtUrl_admin } from "../../../constants";
import PropTypes from "prop-types";

function CreateProduct() {
  const { validated, setValidated, openCreatePdt, setOpenCreatePdt } =
    useContext(ModalContext);

  const handleClose = () => {
    setOpenCreatePdt(false);
  };

  //TODO: make and import a fetchData func in productList component.
  // CreateProduct.propTypes = {
  //   fetchData: PropTypes.func,
  // };

  const pdtRef = useRef("null");

  const schema = Yup.object().shape({
    name: Yup.string().required("pdtName is required"),
    unitPrice: Yup.number().integer().required("pdtPrice is required"),
    img: Yup.string().required("pdtImage is required"),
    adminId: Yup.number().integer().required("adminId is required"),
  });

  const handleSubmit = async (values) => {
    const form = pdtRef.current;

    if (form && form.checkValidity() === true) {
      if (!form.img.files[0]) {
        setValidated(true);
        return;
      }

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("unitPrice", values.unitPrice);
      formData.append("img", form.img.files[0]); // Access the file via form.img.files[0]
      formData.append("adminId", values.adminId);

      console.log("Form values:", values);
      console.log("new form values:", formData);

      try {
        const res = await axios.post(createPdtUrl_admin, formData);
        if (res.status === 201) {
          form.reset();
          setValidated(false);
        } else {
          setValidated(true);
          console.error("Failed to add user:", res.data.message);
        }
      } catch (error) {
        console.error("Error adding user to database", error.message);
        console.error("Error details:", error);
        throw error;
      }
    } else {
      setValidated(true);
    }

    handleClose();
    // fetchData();
  };

  return (
    <div>
      <Dialog open={openCreatePdt} style={{ zIndex: 0 }}>
        <Formik
          initialValues={{
            name: "",
            unitPrice: "",
            img: "",
          }}
          validationSchema={schema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form
              noValidate
              validated={validated.toString()}
              ref={pdtRef}
              autoComplete="off"
            >
              <DialogTitle className="flex justify-between">
                <span>Add New Product</span>
                <div
                  onClick={handleClose}
                  className="bg-black rounded-full p-2 w-[28px] h-[28px] items-center flex"
                >
                  <img src={close} alt="close" className="w-[24px] h-[24px]" />
                </div>
              </DialogTitle>
              <DialogContent>
                <div className="flex gap-4">
                  <FormControl autoFocus fullWidth margin="dense">
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      name="name"
                      label="Product Name"
                      type="text"
                      fullWidth
                      value={values.name}
                      onChange={handleChange}
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
                      autoFocus
                      margin="dense"
                      id="unitPrice"
                      name="unitPrice"
                      label="Unit Price"
                      type="text"
                      fullWidth
                      value={values.unitPrice}
                      onChange={handleChange}
                      error={touched.unitPrice && !!errors.unitPrice}
                    />
                    <ErrorMessage
                      name="price"
                      component="p"
                      className="text-red-600"
                    />
                  </FormControl>
                </div>

                <div className="flex gap-4">
                  <FormControl autoFocus fullWidth margin="dense">
                    <TextField
                      autoFocus
                      margin="dense"
                      id="img"
                      name="img"
                      label=""
                      type="file"
                      fullWidth
                      value={values.img}
                      onChange={handleChange}
                      error={touched.img && !!errors.img}
                    />
                    <ErrorMessage
                      name="img"
                      component="p"
                      className="text-red-600"
                    />
                  </FormControl>
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

export default CreateProduct;

{
  /* <FormControl autoFocus fullWidth margin="dense">
                    <TextField
                      autoFocus
                      margin="dense"
                      id="adminId"
                      name="adminId"
                      label="Admin Id"
                      type="text"
                      fullWidth
                      value={values.adminId}
                      onChange={handleChange}
                      error={touched.adminId && !!errors.adminId}
                    />
                    <ErrorMessage
                      name="adminId"
                      component="p"
                      className="text-red-600"
                    />
</FormControl>
*/
}
