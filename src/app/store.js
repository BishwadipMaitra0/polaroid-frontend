import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import logger from "redux-logger";
import userReducer from "../features/userSlice";
import loginReducer from "../features/loginSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(logger)
});

export default store

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
