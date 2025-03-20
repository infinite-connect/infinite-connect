import { configureStore } from '@reduxjs/toolkit';
import { userCardListApi } from '@features/UserPage/api/userCardListApi';
import { businessCardApi } from '@features/BusinessCard/api/businessCardApi';
import { infoDuplicateCheckApi } from '@features/SignupPage/api/infoDuplicateCheckApi';
import { networkingApi } from '@features/Networking/networkingApi';
import { userCardApi } from '@features/UserCardPage/userCardApi';

export const store = configureStore({
  reducer: {
    [userCardListApi.reducerPath]: userCardListApi.reducer,
    [businessCardApi.reducerPath]: businessCardApi.reducer,
    [infoDuplicateCheckApi.reducerPath]: infoDuplicateCheckApi.reducer,
    [networkingApi.reducerPath]: networkingApi.reducer,
    [userCardApi.reducerPath]: userCardApi.reducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      userCardListApi.middleware,
      businessCardApi.middleware,
      infoDuplicateCheckApi.middleware,
      userCardApi.middleware,
      networkingApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
