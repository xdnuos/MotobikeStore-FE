import { Card} from "@mui/material";
import { styled } from "@mui/material/styles";

export const GlassCard = styled(Card)(({ theme }) => ({
  
  borderRadius: "1rem",
  position: "relative",
  overflow: "hidden",
  boxShadow: `0 3px 10px  rgba(31, 38, 135, 0.37)`,
  backdropFilter: "blur(10px)",
  "-webkit-backdrop-filter": "blur(10px)",
  "&:before": {
    content: "''",
    position: "absolute",
    top: "-50%",
    right: "-50%",
    bottom: "-50%",
    left: "-50%",
    zIndex: -1,
    background:
      "linear-gradient(to bottom right, #def1f5, #d3daf8)",
    filter: "blur(10px)",
    transform: "scale(2)",
  },
  "&:after": {
    content: "''",
    position: "absolute",
    top: "-50%",
    right: "-50%",
    bottom: "-50%",
    left: "-50%",
    zIndex: -1,
    background:
      "linear-gradient(to bottom right, rgb(163, 231, 244, 0.4), rgba(255, 166, 187, 0.4))",
    filter: "blur(10px)",
    transform: "scale(2) rotate(45deg)",
  },
  "& .MuiCardContent-root": {
    position: "relative",
    zIndex: 1,
  },
}));