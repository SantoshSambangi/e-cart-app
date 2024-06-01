import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { signUpContainerStyles, inputStyles } from "./styles";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../components/loader";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {

    const navigate = useNavigate();
  const baseUrl = "https://www.melivecode.com/api/users/create";

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
    email: "",
    avatar: "https://www.melivecode.com/users/cat.png",
  });

  const [errMsg, setErrMsg] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const handleSignUp = async (Data) => {
    try {
      setShowLoader(true);
      const response = await axios.post(baseUrl, Data);
      if (response.data.status === "ok") {
        setShowLoader(false);
        setFormData({});
        navigate("/")
      } else {
        setShowLoader(false);
        setErrMsg(response.data.message);
      }
      // console.log("res", response);
    } catch (error) {
      setShowLoader(false);
      console.log("error", error);
    }
  };

  return (
    <Box sx={signUpContainerStyles}>
      <Typography variant="h4">SignUp</Typography>
      <TextField
        sx={inputStyles}
        id="outlined-basic"
        label="First Name"
        variant="outlined"
        value={formData.fname}
        onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
      />
      <TextField
        sx={inputStyles}
        id="outlined-basic"
        label="Last Name"
        variant="outlined"
        value={formData.lname}
        onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
      />
      <TextField
        sx={inputStyles}
        id="outlined-basic"
        label="User Name"
        variant="outlined"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <TextField
        sx={inputStyles}
        id="outlined-basic"
        label="Password"
        variant="outlined"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <TextField
        sx={inputStyles}
        id="outlined-basic"
        label="Email"
        variant="outlined"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          handleSignUp(formData);
        }}
      >
        Submit
      </Button>
      <Typography color="red">{errMsg}</Typography>
      {showLoader && <LoadingSpinner />}
    </Box>
  );
};
export default SignUpPage;
