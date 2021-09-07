import { Grid, Paper, Typography } from "@material-ui/core";
import { BASE_URL } from "../Constants/apis";

function CartItem({cart}){
    const {product}=cart
    // console.log(product)
    return <Grid container>
        <Grid item xs={4}>
            <img src={`${BASE_URL}/images/${product?._id}/${product?.image}`} />   
        </Grid>
        <Grid item xs={3}>
            <Typography>{product.price}</Typography>            
        </Grid>
        <Grid>

        </Grid>
    </Grid>
}
export default CartItem