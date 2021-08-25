import { useEffect, useState } from "react";
import { ADD_CATEGORY } from "../Constants/apis";
import axios from "axios";
function AddCategory() {
  const [data, setData] = useState({});
  //   useEffect(() => {

  //   }, []);
  const addCategory = () => {
    const article = { title: "yay", color: "#433d2c" };
    axios
      .post(ADD_CATEGORY, article)
      .then((response) => setData(response.data.data));
  };
  return (
    <div>
      <button onClick={addCategory}>Add category</button>
      <button onClick={() => console.log(data)}>Show category</button>
    </div>
  );
}
export default AddCategory;
