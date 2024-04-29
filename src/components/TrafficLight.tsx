import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { LightCircle } from "./LightCircle";

export const TrafficLightContainer = styled(Box)({
  borderRadius: 10,
  height: "fit-content",
  width: "fit-content",
  backgroundColor: "black",
  padding: "3px 8px",
});

interface TrafficLightProps {
  redLight: boolean;
  yellowLight?: boolean;
  greenLight: boolean;
  blinking?: boolean;
  orientation?: "horizontal" | "vertical";
  style?: React.CSSProperties;
}

export const TrafficLight: React.FC<TrafficLightProps> = ({
  redLight,
  yellowLight,
  greenLight,
  blinking = false,
  orientation = "vertical",
  style,
}) => {
  return (
    <TrafficLightContainer
      style={{
        flexDirection: orientation === "vertical" ? "column" : "row",
        ...style,
      }}
    >
      <LightCircle color={redLight ? "red" : "#CCCCCC"} blinking={blinking} />
      {yellowLight !== undefined && (
        <LightCircle color={yellowLight ? "yellow" : "#CCCCCC"} />
      )}
      <LightCircle color={greenLight ? "green" : "#CCCCCC"} />
    </TrafficLightContainer>
  );
};
