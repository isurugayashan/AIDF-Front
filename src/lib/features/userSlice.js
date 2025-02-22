import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {name : "Isuru"},
}; 


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: { 
        setUser: (state, action) =>{
            state.user = action.payload;
        },
    },
});

export const {setUser} = userSlice.actions;
//store the userSlice in store
export default userSlice.reducer; 