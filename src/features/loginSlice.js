import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUser } from "./userSlice";
import axios from "axios";
import { useAppDispatch } from "../app/hooks";

const initialState = {
    loading: false,
    login: false,
    status: "idle",
    method: "idle",
    error: null
}

axios.defaults.withCredentials = true
const BASE_URL = "https://blogify-01.onrender.com/api/"
const checkLoginApi = BASE_URL + "secure/get"

export const checkLogin = createAsyncThunk("check/checkLogin", async (params, { rejectWithValue }) => {
    // console.log("check login!!")
    try {
        const response = await axios.get(checkLoginApi)
        return response.data
    } catch (err) {
        return rejectWithValue("You are not logged in!")
    }
})

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.login = action.payload
        },
        setStatus: (state, action) => {
            state.status = action.payload
        },
        setMethod: (state, action) => {
            state.method = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkLogin.pending, (state, action) => {
                state.loading = true
                state.status = "idle"
                state.method = "fetchUser"
            })
            .addCase(checkLogin.fulfilled, (state, action) => {
                state.loading = false
                state.status = "succeeded"
                state.method ="idle"
                state.error = ''
                state.login = true
            })
            .addCase(checkLogin.rejected, (state, action) => {
                state.loading = false
                state.status = "failed"
                state.method = "idle"
                state.error = "You are not logged in!"
                state.login = false
            })
    }
})

export default loginSlice.reducer
export const { setLogin, setMethod, setStatus }  = loginSlice.actions