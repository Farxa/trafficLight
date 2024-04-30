import { styled } from "@mui/material/styles";
import { Box, SxProps, Theme } from "@mui/material";
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
  redYellow?: boolean;
  greenLight: boolean;
  blinking?: boolean;
  orientation?: "horizontal" | "vertical";
  style?: React.CSSProperties;
  sx?: SxProps<Theme>;
}

export const TrafficLight: React.FC<TrafficLightProps> = ({
  redLight,
  yellowLight,
  redYellow,
  greenLight,
  blinking = false,
  orientation = "vertical",
  sx,
}) => {
  return (
    <TrafficLightContainer
      sx={{
        flexDirection: orientation === "vertical" ? "column" : "row",
        ...sx,
      }}
    >
      <LightCircle
        color={redLight || redYellow ? "red" : "#CCCCCC"}
        blinking={blinking}
      />
      {yellowLight !== undefined && (
        <LightCircle color={yellowLight || redYellow ? "yellow" : "#CCCCCC"} />
      )}
      <LightCircle color={greenLight ? "green" : "#CCCCCC"} />
    </TrafficLightContainer>
  );
};
