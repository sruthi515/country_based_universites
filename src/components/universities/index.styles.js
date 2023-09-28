import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles({
  paper: {
    backgroundColor: "#FFFFFF",
    "& th": {
      color: "#000000",
      background: "#e5e6ec",
    },
    "& tr:nth-child(even)": {
      background: "#c4d1d530",
    },
  },
  container: {
    maxHeight: "40rem",
  },
  message: {
    height: "40rem",
    fontSize: "2rem !important",
    textAlign: "center !important",
  },
});
