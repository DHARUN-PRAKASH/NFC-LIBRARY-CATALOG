import React, { useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Player } from "@lottiefiles/react-lottie-player";
import { signInUser } from "./api"; // Import the API service function

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const BoxContainer = styled.div`
  width: 400px;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 90px;
  position: relative;
`;

const BackDrop = styled.div`
  position: absolute;
  width: 140%;
  height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  top: -300px;
  left: -80px;
  transform: rotate(60deg);
  background: #32348c;
`;

export default function SignIn() {
  const defaultTheme = createTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signInUser(formData.username, formData.password);
      if (response && response.data) {
        sessionStorage.setItem("logged", JSON.stringify(response.data));
        window.location.assign("/");
        alert("Login Successful!");
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Invalid username or password. Please try again!");
    }
  };
  

  return (
    <PageContainer>
      <BoxContainer>
        <TopContainer>
          <BackDrop />
          <div style={{ position: "absolute", top: "49px", left: "50%", transform: "translateX(-50%)", width: "150px" }}>
            <Player
              src="https://lottie.host/9c981348-6b67-47a3-a620-126fd870b0fb/w463329p36.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            />
          </div>
          <div style={{ marginBottom: "40px", textAlign: "center" }}>
            <h2 style={{ color: "#fff" }}>Welcome Back !!!</h2>
            <p style={{ color: "#fff", fontSize: "14px" }}>Please sign-in to continue!</p>
          </div>
        </TopContainer>
        <div style={{ paddingTop: "30px" }}>
          <ThemeProvider theme={defaultTheme}>
            <Container
              component="main"
              maxWidth="xs"
              style={{
                backgroundColor: "#ffffff",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <CssBaseline />
              <form onSubmit={handleSubmit}>
  <TextField
    margin="normal"
    required
    fullWidth
    id="username"
    label="Username"
    name="username"
    value={formData.username}
    onChange={handleChange}
    autoComplete="username"
    autoFocus
  />
  <TextField
    margin="normal"
    required
    fullWidth
    name="password"
    label="Password"
    type={showPassword ? "text" : "password"}
    id="password"
    value={formData.password}
    onChange={handleChange}
    autoComplete="current-password"
    InputProps={{
      endAdornment: (
        <IconButton onClick={handleTogglePasswordVisibility}>
          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
      ),
    }}
  />
  {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
  <Button
    type="submit"
    fullWidth
    variant="contained"
    sx={{
      mt: 3,
      mb: 2,
      borderRadius: 20,
      backgroundColor: "#32348c",
      color: "#fff",
    }}
  >
    Sign In
  </Button>
</form>

            </Container>
          </ThemeProvider>
        </div>
      </BoxContainer>
    </PageContainer>
  );
}
