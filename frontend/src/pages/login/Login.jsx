/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as formik from "formik";
import * as yup from "yup";
import "./login.css";
import axios from "axios";
import { baseUrl } from "../../constants";

//image imports
import { logo_spin } from "../../assets";

const Login = () => {
  //form Handling
  const { Formik } = formik;

  const schema = yup.object().shape({
    name: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  //form states
  const formRef = useRef("null");
  const [validated, setValidated] = useState(false);

  //call states
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const form = formRef.current;

    if (form && form.checkValidity() === true) {
      const user = {
        name: form.name.value,
        password: form.password.value,
      };

      try {
        const res = await axios.post(baseUrl, user);
        console.log(res);

        const { token, redirectUrl } = res.data;

        navigate(redirectUrl);
      } catch (error) {
        // if (error.response && error.response.data) {
        //   console.error("Error response data:", error.response.data);
        //   setError(error.response.data.error);
        // } else {
        //   console.error("Error:", error);
        //   setError("An unexpected error occurred");
        // }
        setError(error.response?.data?.error || "An unexpected error occurred");
      }
      form.reset();
    } else {
      setValidated(true);
    }
  };

  return (
    <div className={`login p-5  flex flex-col justify-evenly text-[12px]`}>
      <div className="mb-2">
        <h2 className="text-center text-white font-bold text-[35px]">
          Make Your Order Now !
        </h2>
      </div>

      <div className="content flex justify-evenly">
        <div className={`img items-center flex justify-center`}>
          <img
            src={logo_spin}
            alt="breakfast"
            className="h-[140px] w-[140px] rounded-full animate-spin animate-spin-slow"
          />
        </div>

        <div className="form py-2 w-full">
          <div className="flex justify-end items-end p-0 gap-10">
            <div className={`rounded forgotSpan mb-2`}>
              <Link
                to="/password/reset_password/:id"
                className="flex justify-evenly w-full p-2 "
              >
                <span className="text-black font-semibold text-[14px]">
                  Forgot Password
                </span>
              </Link>
            </div>
          </div>

          <div className="mx-1">
            <Formik
              validationSchema={schema}
              initialValues={{
                name: "",
                password: "",
              }}
              onSubmit={handleSubmit}
            >
              {({ handleChange, values, touched, errors, handleSubmit }) => (
                <Form
                  noValidate
                  onSubmit={handleSubmit}
                  validated={validated}
                  ref={formRef}
                >
                  <Row>
                    <Col xs={12} md={12}>
                      <Form.Group className="mb-3" controlId="name">
                        <Form.Control
                          required={true}
                          name="name"
                          type="text"
                          placeholder="Username"
                          value={values.name}
                          onChange={handleChange}
                          isInvalid={touched.name && !!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={12}>
                      <Form.Group className="mb-3" controlId="password">
                        <Form.Control
                          required={true}
                          name="password"
                          type="password"
                          placeholder="Password"
                          value={values.password}
                          onChange={handleChange}
                          isInvalid={touched.password && !!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  {error && (
                    <p className="text-danger font-semibold">{error}</p>
                  )}

                  <div className="flex gap-2 justify-center">
                    <button type="submit" className={`rounded loginSpan`}>
                      <div className="flex justify-evenly w-full p-2">
                        <span className="text-black font-semibold text-[14px]">
                          Log In
                        </span>
                      </div>
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
