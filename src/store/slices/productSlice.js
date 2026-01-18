/**
 * Products Redux Slice (Minimal - RTK Query Integration)
 *
 * This slice is kept for compatibility with components that still use
 * the old pattern. Most product operations have been migrated to RTK Query.
 */

import {createSlice} from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "products",
    initialState: {
        selectedProduct: null,
        loading: false,
        error: null,
    },
    reducers: {
        /**
         * Clear selected product
         */
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },
    },
});

export const {clearSelectedProduct} = productSlice.actions;
export default productSlice.reducer;
