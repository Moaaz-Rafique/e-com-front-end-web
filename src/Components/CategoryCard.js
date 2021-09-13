import { Button, Paper, Typography } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";
import { REMOVE_CATEGORY } from "../Constants/apis";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { AddCategory } from "../Containers/AdminPaths";
function CategoryCard({ category }) {
  const [editCategory, setEditCategory] = useState(false);
  const cardStyle = {
    color: category.color,
    padding: 10,
    margin: 10,
    alignItems: "space-between",
    justifyContent: "space-between",
    display: "flex",
  };
  const root = {
    boxShadow: "0px .2px red",
  };

  return (
    <Paper elevation={0} style={root}>
      <Paper style={cardStyle} elevation={0} button>
        <Typography variant="h6">{category.title}</Typography>
        <Typography
          variant="body"
          onClick={() => setEditCategory(!editCategory)}
        >
          {editCategory ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Typography>
      </Paper>
      <Paper style={cardStyle} elevation={0} button>
        {editCategory ? <AddCategory category={category} /> : null}
      </Paper>
    </Paper>
  );
}
export default CategoryCard;
