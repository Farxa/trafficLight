import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

interface LightCircleProps {
  color: string;
  blinking?: boolean;
}

export const LightCircle: React.FC<LightCircleProps> = ({
  color,
  blinking = false,
}) => {
  const LightCircleContainer = styled(Box)({
    width: 40,
    height: 40,
    borderRadius: "50%",
    margin: "10px auto",
    backgroundColor: color,
    "@keyframes blink": {
      "0%": {
        opacity: 1,
      },
      "50%": {
        opacity: 0.5,
      },
      "100%": {
        opacity: 1,
      },
    },
    animation: blinking ? "blink 0.5s linear infinite" : "none",
  });

  return <LightCircleContainer />;
};
