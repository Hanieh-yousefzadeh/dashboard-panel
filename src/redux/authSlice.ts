import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "@/types/auth";


type Auth = {
    user: AuthUser | null
    loaded: boolean
}

const initialState: Auth = {
    user: null,
    loaded: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthUser>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null
        },
        setLoaded: (state) => {
            state.loaded = true;
        }

    }
})

export const { login, logout ,setLoaded } = authSlice.actions
export default authSlice.reducer