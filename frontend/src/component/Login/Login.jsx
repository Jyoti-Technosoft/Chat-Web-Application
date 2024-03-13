import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import apiClient from "../Util/axios";
import { loginSchema } from "../Schemas";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { ShowContext } from "../Context/Context";
import CustomToast from "../ToastComponent/CustomToast";
import { ERROR, SUCCESS } from "../Util/constant";

import loginImg from "../../assets/images/Login-img.png";

import "./Login.scss";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { showToast, setShowToast } = useContext(ShowContext);
  const navigate = useNavigate();

  const checkUserToken = () => {
    const userToken = Cookies.get("token");
    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
      return navigate("/login");
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
    validationSchema: loginSchema,
    onSubmit: (values, action) => {
      apiClient
        .post("/users/login", {
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          setShowToast({
            show: true,
            msg: "Login Successfully",
            type: SUCCESS,
          });
          const token = response.data.token;
          const decode = jwtDecode(token);
          const expdt = new Date(decode.exp * 1000);
          Cookies.set("token", token, { expires: expdt, path: "/" });
          navigate("/chat");
        })
        .catch((AxiosError) => {
          const axiosmsg = AxiosError.response.data.message;
          setShowToast({ show: true, msg: axiosmsg, type: ERROR });
        });

      action.resetForm();
    },
  });

  const openNavigate = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className="login-container vh-100">
        <div className="container-fluid p-0 vh-100">
          <div className="row g-0 vh-100">
            <div className="col-xl-3 col-lg-4">
              <div className="p-4 pb-0 p-lg-5 pb-lg-0">
                <div className="text-dark-50">
                  <h3 className="text-white heading">Chat Application</h3>
                  <p className="text-white font-size-16">
                    Connect to your Friends
                  </p>
                </div>
              </div>
              <div className="img mt-5">
                <img className="login-img" src={loginImg} alt="" />
              </div>
            </div>

            <div className="col-xl-9 col-lg-8">
              <div className="d-flex flex-column vh-100 px-4 pt-4">
                <div className="login-sub-container rounded-top-5 bg-white row justify-content-center my-auto vh-100">
                  <div className="col-sm-8 col-lg-6 col-xl-5 col-xxl-4">
                    <div className="py-md-5 py-4">
                      <form className="px-2" onSubmit={formik.handleSubmit}>
                        <h3 className="login-title text-center mt-4">
                          Welcome Back !
                        </h3>
                        <p className="text-center my-4">
                          Sign in to continue to Chat
                        </p>
                        <div className="my-3">
                          <label htmlFor="email" className="my-2">
                            Email
                          </label>
                          <input
                            id="email"
                            className="login-form-input p-2 border-1 w-100 rounded-3"
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
                            className="login-form-input p-2 w-100 rounded-3"
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
                        <div className="login-sub-btn-div my-4 d-flex">
                          <input
                            className="text-white p-2 border-0 w-100 rounded-3 login-btn"
                            type="submit"
                            value="Login"
                          />
                        </div>
                      </form>
                      <div className="mt-5 text-center text-muted">
                        <p className="text-center">
                          Don't have an account?{" "}
                          <span
                            className="signup-text"
                            onClick={openNavigate}
                            role="button"
                          >
                            Sign Up
                          </span>
                        </p>
                      </div>
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
};

export default Login;
