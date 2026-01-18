import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [], // Array of cart items
        totalQuantity: 0, // Total number of items
        totalPrice: 0, // Total cart value
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );
            if (existingItem) {
                // Product already in cart - increment quantity
                existingItem.quantity += 1;
            } else {
                // New product - add to cart with quantity 1
                state.items.push({...action.payload, quantity: 1});
            }
            // Update totals
            state.totalQuantity += 1;
            state.totalPrice += action.payload.price;
        },
        removeFromCart: (state, action) => {
            const itemIndex = state.items.findIndex(
                (item) => item.id === action.payload.id
            );

            if (itemIndex !== -1) {
                const item = state.items[itemIndex];
                // Update totals by removing item's total cost and quantity
                state.totalPrice -= item.price * item.quantity;
                state.totalQuantity -= item.quantity;
                state.items.splice(itemIndex, 1);
            }
        },
        updateQuantity: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload.id);

            if (item) {
                // Calculate price difference for the quantity change
                const priceDiff = action.payload.quantity - item.quantity;
                state.totalPrice += priceDiff * item.price;
                state.totalQuantity += priceDiff;
                item.quantity = action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
    }
})

export const {addToCart, removeFromCart, updateQuantity, clearCart} =
    cartSlice.actions;
export default cartSlice.reducer;
