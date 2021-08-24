import { useEffect } from "react";
import { useState } from "react";
import ProductCard from "../Components/ProductCard";
import { FETCH_ALL_PRODUCTS } from "../Constants/apis";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#35f51b",
    },
    secondary: {
      main: "#0f0557",
    },
    // background: {
    //   paper: "#dad9d9",
    // },
    // text: {
    //   primary: "rgba(74,74,74,1)",
    // },
  },
});
function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProductList();
  }, []);
  const getProductList = async () => {
    await fetch(FETCH_ALL_PRODUCTS)
      .then((response) => response.json())
      .then((data) => setProducts(data.data))
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <ThemeProvider theme={theme}>
      MyProducts
      {products?.map((product, i) => {
        return <ProductCard key={i} product={product} />;
      })}
    </ThemeProvider>
  );
}
export default Home;
