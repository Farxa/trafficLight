import { styled, keyframes } from "@mui/material/styles";
import { Box } from "@mui/material";

interface LightCircleProps {
  color: string;
  blinking?: boolean;
}

const blinkAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const LightCircleContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "blinking",
})<{ blinking?: boolean }>(({ blinking }) => ({
  width: 40,
  height: 40,
  borderRadius: "50%",
  margin: "10px auto",
  backgroundColor: "currentColor",
  animation: blinking ? `${blinkAnimation} 0.5s linear infinite` : "none",
}));

export const LightCircle: React.FC<LightCircleProps> = ({
  color,
  blinking = false,
}) => {
  return <LightCircleContainer blinking={blinking} style={{ color }} />;
};
