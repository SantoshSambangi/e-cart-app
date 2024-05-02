import React, { useState } from "react";
import styles from "./styles.module.css";
import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { userLoginImg } from "../../resources";
import { Navigate, useNavigate } from "react-router-dom";

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

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState({
        email: "",
        password: "",
    });

    const handleValidation = () => {
        const newErrorMessages = {};
        if (loginData.email === "") {
            newErrorMessages.email = "Please enter your email id";
        }
        if (loginData.password === "") {
            newErrorMessages.password = "Please enter your password";
        }
        setErrorMessage({ ...newErrorMessages });
        if (Object.keys(newErrorMessages).length === 0) {
            navigate("/products");
            localStorage.setItem("userData", JSON.stringify(loginData));
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
                        error={errorMessage?.email && true}
                        id="outlined-basic"
                        label={"Email"}
                        variant="outlined"
                        type="email"
                        sx={{ width: "350px" }}
                        onChange={(e) =>
                            setLoginData({
                                ...loginData,
                                email: e.target.value,
                            })
                        }
                        onFocus={() =>
                            setErrorMessage({ ...errorMessage, email: "" })
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
                            setErrorMessage({ ...errorMessage, password: "" })
                        }
                    />
                    <Button variant="contained" onClick={handleValidation}>
                        Login
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
