import { configureStore } from '@reduxjs/toolkit';
import { userCardListApi } from '@features/UserPage/api/userCardListApi';
import { businessCardApi } from '@features/BusinessCard/api/businessCardApi';
import { infoDuplicateCheckApi } from '@features/SignupPage/api/infoDuplicateCheckApi';
import { networkingApi } from '@features/Networking/networkingApi';
import userReducer from '@features/User/slice/userSlice';
import { selectCardDesignApi } from '@features/BusinessCard/api/selectCardDesignApi';
import { viewCountApi } from '@features/User/api/viewCountApi';
import { exchangeApi } from '@features/BusinessCard/api/exchangeApi';

export const store = configureStore({
  reducer: {
    [userCardListApi.reducerPath]: userCardListApi.reducer,
    [businessCardApi.reducerPath]: businessCardApi.reducer,
    [selectCardDesignApi.reducerPath]: selectCardDesignApi.reducer,
    [infoDuplicateCheckApi.reducerPath]: infoDuplicateCheckApi.reducer,
    [networkingApi.reducerPath]: networkingApi.reducer,
    [viewCountApi.reducerPath]: viewCountApi.reducer,
    [exchangeApi.reducerPath]: exchangeApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      userCardListApi.middleware,
      businessCardApi.middleware,
      selectCardDesignApi.middleware,
      infoDuplicateCheckApi.middleware,
      networkingApi.middleware,
      viewCountApi.middleware,
      exchangeApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
