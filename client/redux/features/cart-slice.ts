import { getAllItemsInCart } from '@/services/cartService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const handleGetItemsInCart = createAsyncThunk(
    'user/getitems',
    async () => {
        const res = await getAllItemsInCart();
        return res.DT.Products;
    }
)

interface cartState {
    cartItems: []
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    cartItems: [],
    loading: 'idle',
} as cartState


export const cart = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(handleGetItemsInCart.fulfilled, (state: any, action: any) => {
            state.cartItems = [...action.payload]
        })
    }
})

export default cart.reducer;