import React, { useState } from "react";
import styles from "./styles.module.css";
import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { userLoginImg } from "../../resources";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../components/loader";

const Login = () => {
  const mainContainerStyles = {
    display: "flex",
    flexDirection: "column",
    gap: "40px",
    backgroundColor: "",
    height: "100vh",
  };

  const loginContentStyles = {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    margin: "auto",
    alignItems: "center",
    justifyConter: "center",
  };

  const inputBlockStyles = {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 16px 0 rgba(236,238,244,.12)",
  };

  const navigate = useNavigate();

  const baseUrl = " https://www.melivecode.com/api/login";

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    username: "",
    password: "",
    apiErrMsg: "",
  });

  const [userData, setUserData] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const handleValidation = () => {
    const newErrorMessages = {};
    if (loginData.username === "") {
      newErrorMessages.username = "Please enter your email id";
    }
    if (loginData.password === "") {
      newErrorMessages.password = "Please enter your password";
    }
    setErrorMessage({ ...newErrorMessages });
    if (Object.keys(newErrorMessages).length === 0) {
      handleLogin(loginData);
      // navigate("/products");
      // localStorage.setItem("userData", JSON.stringify(loginData));
    }
  };

  const handleLogin = async (Data) => {
    try {
      setShowLoader(true);
      const response = await axios.post(baseUrl, Data);
      if (response.data.status === "ok") {
        setShowLoader(false);
        setUserData(response.data);
        // navigate("/products");
        navigate("/products", {
          state: {
            userData: response.data,
          },
        });
      } else {
        setShowLoader(false);
        setErrorMessage({
          ...errorMessage,
          apiErrMsg: response.data.message,
        });
      }
      //   console.log("response", response);
    } catch (error) {
      console.log("error", error);
      setShowLoader(false);
      setErrorMessage({
        ...errorMessage,
        apiErrMsg: error.response.statusText,
      });
    }
  };

  return (
    <Box sx={mainContainerStyles}>
      <Typography variant="h4" alignSelf="center" paddingTop="40px">
        E-Cart
      </Typography>

      <Box sx={loginContentStyles}>
        <div className={styles.imageBlockStyles}>
          <img
            src={userLoginImg}
            alt="userLogin"
            className={styles.imageStyles}
          />
        </div>
        <Box sx={inputBlockStyles}>
          <TextField
            error={errorMessage?.username && true}
            id="outlined-basic"
            label={"Email"}
            variant="outlined"
            type="text"
            sx={{ width: "350px" }}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                username: e.target.value,
              })
            }
            onFocus={() =>
              setErrorMessage({ ...errorMessage, username: "", apiErrMsg: "" })
            }
          />
          <TextField
            error={errorMessage?.password && true}
            id="outlined-basic"
            label={"Password"}
            variant="outlined"
            type="password"
            sx={{ width: "350px" }}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                password: e.target.value,
              })
            }
            onFocus={() =>
              setErrorMessage({ ...errorMessage, password: "", apiErrMsg: "" })
            }
          />
          <Typography>
            Do you hava an account please{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >
              Signup
            </span>
          </Typography>

          {errorMessage.apiErrMsg && (
            <Typography color="red">{errorMessage.apiErrMsg}</Typography>
          )}
          <Button
            variant="contained"
            onClick={() => {
              handleValidation();
            }}
          >
            Login
          </Button>
        </Box>
      </Box>
      {showLoader && <LoadingSpinner />}
    </Box>
  );
};

export default Login;
