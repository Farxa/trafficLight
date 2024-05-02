import { Typography, AppBar } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const Header: React.FC = () => {
  const theme = useTheme();
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        color: theme.palette.text.primary,
      }}
    >
      <Typography variant="h1">Traffic Lights Demo</Typography>
    </AppBar>
  );
};
