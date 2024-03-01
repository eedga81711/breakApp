/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import * as formik from "formik";
import * as yup from "yup";
import { Form, Col, Row } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { setPasswordUrl } from "../constants";

//image imports
import { logo_spin } from "../assets";
import axios from "axios";

const SetPassword = () => {
  const { Formik } = formik;

  const schema = yup.object().shape({
    name: yup.string().required("Username is required"),
    firstPassword: yup.string().required("firstPassword is required"),
    secondPassword: yup.string().required("secondPassword is required"),
  });

  //form states
  const formRef = useRef("null");
  const [validated, setValidated] = useState(false);

  //call states
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  console.log("Current path:", location.pathname);
  const [title, setTitle] = useState("");

  const handleSubmit = async (values) => {
    const { name, firstPassword, secondPassword } = values;

    const form = formRef.current;

    if (form && form.checkValidity() === true) {
      if (firstPassword !== secondPassword) {
        setError("Passwords do not match");
        return;
      }

      const user = {
        name: name,
        password: firstPassword,
      };

      //FIXME: this is supposed to route through password
      try {
        const res = await axios.post(setPasswordUrl, user);
        console.log(res);

        navigate("/");
      } catch (error) {
        setError(error.response?.data?.error || "An unexpected error occurred");
      }
      form.reset();
    } else {
      setValidated(true);
    }
  };

  useEffect(() => {
    console.log("useEffect triggered");
    setTitle(
      location.pathname === "/password/reset_password/:id"
        ? "Hello 😊😊! Reset Password"
        : "Welcome! Set your Password"
    );
  }, [location.pathname]);

  console.log("Title:", title);

  return (
    <div
      className={`login p-5 flex flex-col justify-evenly text-[12px] text-white`}
    >
      {/* <div className="mb-2">
        <h3 className="text-center font-extrabold text-[35px]">{title}</h3>
      </div> */}

      <div className="content flex justify-evenly">
        <div className={`img items-center flex justify-center`}>
          <img
            src={logo_spin}
            alt="breakfast"
            className="h-[140px] w-[140px] rounded-full animate-spin animate-spin-slow"
          />
        </div>

        <div className="form p-2">
          <h3 className="text-center font-extrabold text-[35px]">{title}</h3>
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              name: "",
              firstPassword: "",
              secondPassword: "",
            }}
          >
            {({ handleChange, values, touched, errors, handleSubmit }) => (
              <Form
                noValidate
                validated={validated}
                ref={formRef}
                autoComplete="true"
                onSubmit={handleSubmit}
              >
                <Row>
                  <Col xs={12} md={12}>
                    <Form.Group className="mb-1" controlId="name">
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
                    <Form.Group className="mb-1" controlId="firstPassword">
                      <Form.Control
                        required={true}
                        name="firstPassword"
                        type="password"
                        placeholder="Enter Password."
                        value={values.firstPassword}
                        onChange={handleChange}
                        isInvalid={
                          touched.firstPassword && !!errors.firstPassword
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstPassword}
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
                        placeholder="Confirm Password."
                        value={values.secondPassword}
                        onChange={handleChange}
                        isInvalid={
                          touched.secondPassword && !!errors.secondPassword
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.secondPassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {error && <p className="text-danger font-semibold">{error}</p>}

                <div className="flex gap-2 justify-center mt-2">
                  <button type="submit" className={`rounded loginSpan`}>
                    <div className="flex justify-evenly w-full p-2">
                      <span className="text-black font-semibold text-[14px]">
                        Save Password
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
  );
};

export default SetPassword;

/** <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.paddingY}`}
    >
      <div
        className={`flex-1 flex-col xl:px-0 sm:px-16 px-6 ${styles.flexStart} `}
      >
        <div className="flex flex-row items-center justify-center py-[6px] px-4 rounded-[10px] mb-2 gap-2 bg-yellow">
          <GiCash className="text-white w-[32px] h-[32px] animate-bounce" />
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-white">A daily </span> Budget
            <span className="text-white"> of UgSh</span> 2000
          </p>
        </div>

        <div className="flex flex-row justify-between items-center w-full ">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100px] leading-[75px]">
            Order Your
            <br className="sm:block hidden" /> {""}
            <span className="text-yellow">BreakFast Snack</span>
          </h1>
        </div>

        <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100px] leading-[75px] w-full">
          {" "}
          At Your Convenience.
        </h1>
        <div className=""></div> 
      </div>
      <div
        className={`flex-1 flex ${styles.flexCenter} relative md:my-0 my-10`}
      >
        <img
          src={logo_spin}
          alt="breakfast_logo"
          className="w-[400px] h-[400px] rounded-full animate-spin animate-spin-slow"
        />
      </div>
    </section> */
