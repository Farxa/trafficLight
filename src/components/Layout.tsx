import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import backgroundImage from "../assets/crossroad.png";

export const CrossRoadContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "80vh",
  width: "80vw",
  padding: 0,
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
});

export const PedestrianLightContainer = styled(Box)({
  position: "absolute",
  bottom: 8,
  left: "50%",
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

export const PedestrianIconContainer = styled(Box)({
  position: "absolute",
  bottom: 1,
  left: "50%",
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

export const TrafficLightRow = styled(Box)({
  display: "flex",
  flexDirection: "row",
  height: "50%",
  width: "100%",
});

export const TrafficLightContainer = styled(Box)({
  width: "50%",
  display: "flex",
  position: "relative",
});
