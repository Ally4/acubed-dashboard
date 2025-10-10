import { createSlice } from '@reduxjs/toolkit'

const checkoutSLice = createSlice({
    name: 'checkout',
    initialState: {
        items: [],
        error: null
    },
    reducers: {
        checkoutAdd(state, action) {
            state.items.push(action.payload)
        }, 
        checkoutRemove(state, action) {
            removalId = action.payload
            for (let i=0; i < state.items.length; i++ ) {
                if (state.items[i].id == removalId) {
                    state.items.pop(i)
                    break
                }
            }            
        },
        checkoutClear(state) {
            state.items = []
        }
    }
});

export const { checkoutAdd, checkoutRemove, checkoutClear } = checkoutSLice.actions;

export default checkoutSLice.reducer;