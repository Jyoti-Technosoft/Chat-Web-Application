import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShowContext } from "../Context/Context";
import apiClient from "../Util/axios";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import { signUpSchema } from "../Schemas";
import CustomToast from "../ToastComponent/CustomToast";
import { ERROR, SUCCESS } from "../Util/constant";

import loginImg from "../../assets/images/Login-img.png";

import "./Register.scss";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  password: "",
  cpassword: "",
};

function Register() {
  const { showToast, setShowToast } = useContext(ShowContext);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    const userToken = Cookies.get("token");
    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
      return navigate("/signup");
    } else {
      setIsLoggedIn(true);
      return navigate("/chat");
    }
  };

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  const formik = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      action.resetForm();
      apiClient
        .post("/users/register", {
          firstName: values.firstName,
          lastName: values.lastName,
          gender: values.gender,
          password: values.password,
          email: values.email,
        })
        .then((response) => {
          setShowToast({
            show: true,
            msg: "Register Successfull",
            type: SUCCESS,
          });
          navigate("/login");
        })
        .catch((AxiosError) => {
          setShowToast({
            show: true,
            msg: AxiosError.response.data.message,
            type: ERROR,
          });
        });
    },
  });

  const openNavigate = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="register-container vh-100">
        <div className="container-fluid p-0 vh-100">
          <div className="row g-0 vh-100">
            <div className="col-xl-3 col-lg-4">
              <div className="p-4 pb-0 p-lg-5 pb-lg-0">
                <div className="text-dark-50">
                  <h3 className="text-white">Chat Application</h3>
                  <p className="text-white font-size-16">
                    Connect to your Friends
                  </p>
                </div>
              </div>
              <div className="img mt-5">
                <img className="register-img" src={loginImg} alt="" />
              </div>
            </div>

            <div className="col-xl-9 col-lg-8">
              <div className="d-flex flex-column vh-100 px-4 pt-4">
                <div className="register-sub-container rounded-top-5 bg-white row justify-content-center my-auto vh-100">
                  <div className="col-sm-8 col-lg-6 col-xl-5 col-xxl-4">
                    <div className="py-md-5 py-4">
                      <form className="px-2" onSubmit={formik.handleSubmit}>
                        <h3 className="register-title text-center mt-4">
                          Register Account
                        </h3>
                        <p className="text-center my-2">
                          Sign Up to continue to Chat
                        </p>
                        <div className="my-3">
                          <label className="my-2" htmlFor="firstName">
                            First Name
                          </label>
                          <input
                            id="firstName"
                            className="register-form-input p-2 border-1 w-100 rounded-3"
                            type="text"
                            placeholder="Enter your First Name"
                            name="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            autoComplete="off"
                          />
                          {formik.errors.firstName &&
                          formik.touched.firstName ? (
                            <p className="text-danger text-center mt-2">
                              {formik.errors.firstName}
                            </p>
                          ) : null}
                        </div>
                        <div className="my-3">
                          <label className="my-2" htmlFor="lastName">
                            Last Name
                          </label>
                          <input
                            id="lastName"
                            className="register-form-input p-2 border-1 w-100 rounded-3"
                            type="text"
                            placeholder="Enter your Last Name"
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            autoComplete="off"
                          />
                          {formik.errors.lastName && formik.touched.lastName ? (
                            <p className="text-danger text-center mt-2">
                              {formik.errors.lastName}
                            </p>
                          ) : null}
                        </div>
                        <div className="my-3 input-radio-div text-start">
                          <span className="input-radio-title me-4">
                            Gender:{" "}
                          </span>
                          <span className="input-radio me-2">
                            <label htmlFor="male">Male</label>
                            <input
                              className="mx-2"
                              id="male"
                              type="radio"
                              name="gender"
                              value="male"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                          </span>
                          <span className="input-radio me-2">
                            <label htmlFor="female">Female</label>
                            <input
                              className="mx-2"
                              id="female"
                              type="radio"
                              name="gender"
                              value="female"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                          </span>
                          <span className="input-radio me-2">
                            <label htmlFor="other">Other</label>
                            <input
                              className="mx-2"
                              id="other"
                              type="radio"
                              name="gender"
                              value="other"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                          </span>
                          {formik.errors.gender && formik.touched.gender ? (
                            <p className="text-danger text-center mt-2">
                              {formik.errors.gender}
                            </p>
                          ) : null}
                        </div>
                        <div className="my-3">
                          <label className="my-2" htmlFor="email">
                            Email
                          </label>
                          <input
                            id="email"
                            className="register-form-input p-2 border-1 w-100 rounded-3"
                            type="text"
                            placeholder="Enter your Email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            autoComplete="off"
                          />
                          {formik.errors.email && formik.touched.email ? (
                            <p className="text-danger text-center mt-2">
                              {formik.errors.email}
                            </p>
                          ) : null}
                        </div>
                        <div className="my-3">
                          <label className="my-2" htmlFor="password">
                            Password
                          </label>
                          <input
                            id="password"
                            className="register-form-input p-2 border-1 w-100 rounded-3"
                            type="password"
                            placeholder="Enter your Password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            autoComplete="off"
                          />
                          {formik.errors.password && formik.touched.password ? (
                            <p className="text-danger text-center mt-2">
                              {formik.errors.password}
                            </p>
                          ) : null}
                        </div>
                        <div className="my-3">
                          <label className="my-2" htmlFor="cpassword">
                            Confirm Password
                          </label>
                          <input
                            id="cpassword"
                            className="register-form-input p-2 border-1 w-100 rounded-3"
                            type="password"
                            placeholder="Enter your Confirm Password"
                            name="cpassword"
                            value={formik.values.cpassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            autoComplete="off"
                          />
                          {formik.errors.cpassword &&
                          formik.touched.cpassword ? (
                            <p className="text-danger text-center mt-2">
                              {formik.errors.cpassword}
                            </p>
                          ) : null}
                        </div>
                        <div className="register-sub-btn-div my-4">
                          <input
                            className="text-white p-2 border-0 w-100 rounded-3 register-btn"
                            type="submit"
                            value="Register"
                          />
                        </div>
                        <div className="mt-5 text-center text-muted">
                          <p className="text-center">
                            Already have an account?{" "}
                            <span
                              className="signup-text"
                              onClick={openNavigate}
                              role="button"
                            >
                              Login
                            </span>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showToast ? <CustomToast /> : null}
    </>
  );
}

export default Register;