import { styled } from "@mui/material/styles";
import { Box, SxProps, Theme } from "@mui/material";
import { LightCircle } from "./LightCircle";
import { LightState } from "../types";

export const TrafficLightContainer = styled(Box)({
  borderRadius: 10,
  height: "fit-content",
  width: "fit-content",
  backgroundColor: "black",
  padding: "3px 8px",
});

interface TrafficLightProps {
  lights: LightState;
  blinking?: boolean;
  orientation?: "horizontal" | "vertical";
  position?: "top-left" | "bottom-right";
  isPedestrianLight?: boolean;
}

export const TrafficLight: React.FC<TrafficLightProps> = ({
  lights,
  blinking = false,
  orientation = "vertical",
  position,
  isPedestrianLight = false,
}) => {
  const { color } = lights;
  const positionStyles = {
    "top-left": {
      position: "absolute",
      top: 152,
      left: 112,
    },
    "bottom-right": {
      display: "flex",
      position: "absolute",
      bottom: 40,
      right: 110,
      gap: "10px",
    },
  };

  return (
    <TrafficLightContainer
      sx={{
        flexDirection: orientation === "vertical" ? "column" : "row",
        ...(position ? positionStyles[position] : {}),
      }}
    >
      <LightCircle
        color={color === "red" || color === "redYellow" ? "red" : "#CCCCCC"}
        blinking={blinking}
      />
      {!isPedestrianLight && (
        <LightCircle
          color={
            color === "yellow" || color === "redYellow" ? "yellow" : "#CCCCCC"
          }
        />
      )}
      <LightCircle color={color === "green" ? "green" : "#CCCCCC"} />
    </TrafficLightContainer>
  );
};
