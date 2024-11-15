import React from "react";
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
import { Player } from "@lottiefiles/react-lottie-player"; // Correct import for Player

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

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.div`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 50;
`;

const SmallText = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: #fff;
  z-index: 10;
`;

const LottieWrapper = styled.div`
  position: absolute;
  top: 49px;  // Adjust to move the animation closer to the top of the container
  left: 50%;  // Center it horizontally
  transform: translateX(-50%);
  width: 100%;
  max-width: 150px;  // Increase the max-width to make the animation larger
  height: auto;  // Automatically adjust the height based on width
`;


export default function SignIn() {
  const defaultTheme = createTheme();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <PageContainer>
      <BoxContainer>
        <TopContainer>
          <BackDrop />
          <LottieWrapper>
            {/* Use the Player component from lottie library */}
            <Player
              src="https://lottie.host/9c981348-6b67-47a3-a620-126fd870b0fb/w463329p36.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            />
          </LottieWrapper>
          <HeaderContainer style={{marginBottom:'40px'}}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <HeaderText>Welcome Back !!!</HeaderText>
            </div>
            <SmallText>Please sign-in to continue!</SmallText>
          </HeaderContainer>
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
              <div className="mb-3 text-center"></div>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
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
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={handleTogglePasswordVisibility}>
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    ),
                  }}
                />
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
              </Box>
            </Container>
          </ThemeProvider>
        </div>
      </BoxContainer>
    </PageContainer>
  );
}
