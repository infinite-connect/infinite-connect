import { configureStore } from '@reduxjs/toolkit';
import { userCardListApi } from '@features/UserPage/api/userCardListApi';

const store = configureStore({
  reducer: {
    [userCardListApi.reducerPath]: userCardListApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userCardListApi.middleware), // API 미들웨어 추가
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
