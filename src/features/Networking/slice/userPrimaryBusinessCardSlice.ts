import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PrimaryCard {
  business_card_id: string;
  fields_of_expertise: string;
  sub_expertise: string;
  card_type: string;
  is_public?: boolean;
  interests?: string[];
}

interface userPrimaryBusinessCardSliceState {
  primaryCard: PrimaryCard | null;
}

const initialState: userPrimaryBusinessCardSliceState = {
  primaryCard: null,
};

const userPrimaryBusinessCardSlice = createSlice({
  name: 'businessCard',
  initialState,
  reducers: {
    setPrimaryCard(state, action: PayloadAction<PrimaryCard>) {
      state.primaryCard = action.payload;
    },
  },
});

export const { setPrimaryCard } = userPrimaryBusinessCardSlice.actions;
export default userPrimaryBusinessCardSlice.reducer;
