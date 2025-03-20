import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@store/slices/counterSlice';
import { networkingApi } from '@features/Networking/networkingApi';
import { userCardApi } from '@features/UserCardPage/userCardApi';
export const store = configureStore({
  reducer: {
    [networkingApi.reducerPath]: networkingApi.reducer,
    [userCardApi.reducerPath]: userCardApi.reducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userCardApi.middleware, networkingApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
