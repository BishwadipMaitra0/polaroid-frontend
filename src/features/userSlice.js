import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: {},
  method: "idle",
  status: "idle",
  error: null
}

axios.defaults.withCredentials = true
const BASE_URL = "http://localhost:3500/"

const api = BASE_URL + "user/login"
export const fetchUser = createAsyncThunk("fetch/fetchUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(api, credentials, { withCredentials: true })
    return response.data
  } catch (err) {
    return rejectWithValue(err)
  }
})

const apiOut = BASE_URL + "user/logout"
export const fetchOutUser = createAsyncThunk("fetch/fetchOutUser", async (Params, { rejectWithValue }) => {
  try {
    const response = await axios.get(apiOut, { withCredentials: true })
    return response.data
  } catch (err) {
    return rejectWithValue("You are not logged in!")
  }
})

const apiUserDetails = BASE_URL + "user/check"
export const fetchUserDetails = createAsyncThunk("fetch/fetchUserDetails", async (Params, { rejectWithValue }) => {
  try {
    const response = await axios.get(apiUserDetails, { withCredentials: true })
    return response.data
  } catch (err) {
    return rejectWithValue("You are not logged in!")
  }
})

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => initialState,
    setStatus: (state, action) => {
      state.status = "idle"
    },
    setData: (state, action) => {
      state.data = action.payload
    },
    setMethod: (state, action) => {
      state.method = "idle"
    },
    setLoggedIn: (state, action) => {
      state.data.isLoggedIn = action.payload
    },
    setState: (state, action) => {
      state.data.name = action.payload.name
      state.data.email = action.payload.email
      state.data.isLoggedIn = true
      state.data.image = action.payload.image
    },
    setName: (state, action) => {
      state.data.name = action.payload.name
    },
    setEmail: (state, action) => {
      state.data.email = action.payload.email
    },
    setImage: (state, action) => {
      state.data.image = action.payload.image
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.loading = true
        state.status = "idle"
        state.method = "login"
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false
        state.status = "succeeded"
        state.method = "login"
        state.data = action.payload
        state.error = "Logged in successfully!"
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false
        state.status = "failed"
        state.method = "login"
        state.data = {}
        state.error = "Your credentials do not match any credentials in our system!"
    })
    .addCase(fetchOutUser.pending, (state, action) => {
        state.loading = true
        state.status = "idle"
        state.method = "logout"
    })
    .addCase(fetchOutUser.fulfilled, (state, action) => {
        state.loading = false
        state.status = "succeeded"
        state.method = "logout"
        state.data = action.payload
        state.error = "Logged out successfully!"
    })
    .addCase(fetchOutUser.rejected, (state, action) => {
        state.loading = false
        state.status = "failed"
        state.method = "logout"
        state.data = {}
        state.error = "Logout failed!"
    })
    .addCase(fetchUserDetails.pending, (state, action) => {
        state.loading = true
        state.status = "idle"
        state.method = "fetchingUserDetails"
    })
    .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false
        state.status = "succeeded"
        state.method = "fetchingUserDetails"
        state.data = action.payload
        state.error = "Fetched User Details Successfully!"
        // console.log("action payload fetch user details is : ", action.payload)
    })
    .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false
        state.status = "failed"
        state.method = "fetchingUserDetails"
        state.data = {}
        state.error = "Failed to fetch user details!"
        // console.log("rejected, state error is : ", state.error)
    })
  }
})

export const { setName, setData, setEmail, setImage, setLoggedIn, setMethod, setState, setStatus } = userSlice.actions
export default userSlice.reducer