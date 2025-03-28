import { configureStore } from '@reduxjs/toolkit';
import { userCardListApi } from '@features/UserPage/api/userCardListApi';
import { businessCardApi } from '@features/BusinessCard/api/businessCardApi';
import { infoDuplicateCheckApi } from '@features/SignupPage/api/infoDuplicateCheckApi';
import { networkingApi } from '@features/Networking/networkingApi';
import { userCardApi } from '@features/UserCardPage/userCardApi';
import userReducer from '@features/User/slice/userSlice';
import { selectCardDesignApi } from '@features/BusinessCard/api/selectCardDesignApi';
import { viewCountApi } from '@features/User/api/viewCountApi';
import userPrimaryBusinessCardRedcuer from '@features/Networking/slice/userPrimaryBusinessCardSlice';
export const store = configureStore({
  reducer: {
    [userCardListApi.reducerPath]: userCardListApi.reducer,
    [businessCardApi.reducerPath]: businessCardApi.reducer,
    [selectCardDesignApi.reducerPath]: selectCardDesignApi.reducer,
    [infoDuplicateCheckApi.reducerPath]: infoDuplicateCheckApi.reducer,
    [networkingApi.reducerPath]: networkingApi.reducer,
    [userCardApi.reducerPath]: userCardApi.reducer,
    [viewCountApi.reducerPath]: viewCountApi.reducer,
    user: userReducer,
    userBusinessCard: userPrimaryBusinessCardRedcuer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      userCardListApi.middleware,
      businessCardApi.middleware,
      selectCardDesignApi.middleware,
      infoDuplicateCheckApi.middleware,
      userCardApi.middleware,
      networkingApi.middleware,
      viewCountApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
