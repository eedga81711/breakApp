/* eslint-disable no-unused-vars */
import React from "react";
import * as formik from "formik";
import * as yup from "yup";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

//toast imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const notify = () => {
  toast.success("Password has been reset successfully !");
};

//image imports
import { logo_spin } from "../assets";

const ForgotPassword = () => {
  const { Formik } = formik;

  const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    firstPassword: yup.string().required(),
    secondPassword: yup.string().required(),
  });
  return (
    <div className={`login p-5 flex flex-col justify-evenly text-[12px]`}>
      <div></div>

      <div className="content flex justify-evenly">
        <div className={`img items-center flex justify-center`}>
          <img
            src={logo_spin}
            alt="breakfast"
            className="h-[140px] w-[140px] rounded-full animate-spin animate-spin-slow"
          />
        </div>

        <div className="form p-2">
          <h3 className="text-center text-white text-[35px] mb-2">
            Set New Password
          </h3>

          <Formik
            validationSchema={schema}
            // onSubmit={saveDev}
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              gender: "",
              dob: "",
            }}
          >
            {({ handleChange, values, touched, errors }) => (
              <Form
              // noValidate
              // validated={validated}
              // ref={}
              // onSubmit={}
              // autoComplete="true"
              >
                <Row>
                  <Col xs={12} md={12}>
                    <Form.Group className="mb-1" controlId="username">
                      <Form.Control
                        required={true}
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={values.username}
                        onChange={handleChange}
                        isInvalid={!!errors.username}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12} md={12}>
                    <Form.Group className="mb-1" controlId="email">
                      <Form.Control
                        required={true}
                        name="email"
                        type="text"
                        placeholder="E-mail."
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12} md={12}>
                    <Form.Group className="mb-1" controlId="firstPassword">
                      <Form.Control
                        required={true}
                        name="firstPassword"
                        type="password"
                        placeholder="Enter New Password."
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12} md={12}>
                    <Form.Group className="mb-1" controlId="secondPassword">
                      <Form.Control
                        required={true}
                        name="secondPassword"
                        type="password"
                        placeholder="Confirm New Password."
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>

          <div className="flex gap-2 justify-center mt-2">
            <div className={`rounded loginSpan`}>
              <Link to="" className="flex justify-evenly w-full p-2 ">
                <span
                  className="text-black font-semibold text-[14px]"
                  onClick={notify}
                >
                  Save Password
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
