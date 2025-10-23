import { configureStore } from "@reduxjs/toolkit";
import isModalOpenSlice from "./modalSlice";
import vehicleData from "./vehiclesSlice";

export const store = configureStore({
	reducer: {
		isModalOpen: isModalOpenSlice,
		vehicleData: vehicleData,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
