import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type isModalOpenState = {
	value: boolean;
};

const initialState: isModalOpenState = {
	value: false,
};

export const isModalOpenSlice = createSlice({
	name: "isModalOpen",
	initialState,
	reducers: {
		setIsModalOpen: (state, action: PayloadAction<boolean>) => {
			state.value = action.payload;
		},
	},
});

export const { setIsModalOpen } = isModalOpenSlice.actions;

export default isModalOpenSlice.reducer;
