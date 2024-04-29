import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import backgroundImage from "../assets/crossroad.png";

export const Root = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "100vw",
  margin: "25px 0 0 0;",
  padding: 0,
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
});

export const Row = styled(Box)({
  display: "flex",
  flexDirection: "row",
  height: "50%",
  width: "100%",
});

export const Container = styled(Box)({
  width: "50%",
  display: "flex",
  position: "relative",
});
