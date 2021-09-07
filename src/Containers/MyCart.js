import { Grid, Paper, Typography } from "@material-ui/core"
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {CartItem} from "../Components"
import { GET_CURRENT_CART } from "../Constants/apis"

function MyCart(){
    // const user={
    //     _id: "6123a3b8b1094424685248cc",
    //     name: "Guest User",
    //   }
    const user = useSelector(
        state => state.userReducer.user_details
    )
    const [myCart,setMyCart]=useState([])
    useEffect(()=>{
        console.log("sdsd")
        getMyCart()
    },[])
    const getMyCart = async ()=>{        
        
        const cartFor = {user: user?._id}
        const data = await axios.get(GET_CURRENT_CART,{params: cartFor})
        setMyCart(data.data.data)
        // console.log(data.data.data)
    }    
    return (
        <Grid container>
            <Grid item sm={8}>
                <Typography>Shopping Cart</Typography>
                    {myCart.map((e,i)=>{
                        return(<div key={i}>
                            <h1>why</h1>                           
                            <CartItem  cart={e} >
                                {e.product.title}
                            </CartItem>
                            </div>
                        )
                    })}
                    
            </Grid>
        </Grid>
    )
}

export default MyCart