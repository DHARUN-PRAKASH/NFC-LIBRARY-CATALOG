import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import AppBarComponent from "../AppBar";

const images = [
  {
    url: "https://via.placeholder.com/400x300",
    title: "Attendance",
    width: "33.33%",
    route: "/attendance", // Route to navigate
  },
  {
    url: "https://via.placeholder.com/400x300",
    title: "Borrow Book",
    width: "33.33%",
    route: "/borrow-book", // Route to navigate
  },
  {
    url: "https://via.placeholder.com/400x300",
    title: "Return Book",
    width: "33.33%",
    route: "/return-book", // Route to navigate
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 200,
  width: "100%",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease",
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    transform: "scale(1.05)",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

export default function Home() {
  const navigate = useNavigate(); // Hook for navigation

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div>
      <AppBarComponent/>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        padding: 2,
        backgroundColor: "#f9f9f9",
        flexWrap: "nowrap",
      }}
    >
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          onClick={() => handleNavigation(image.route)} // Navigate on click
          style={{
            width: image.width,
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="h6"
              color="inherit"
              sx={{
                position: "relative",
                p: 2,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
    </div>
  );
}
