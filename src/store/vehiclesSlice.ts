import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VehicleData } from "../types/vehiclesTypes";

const initialState: VehicleData[] = [];

export const vehicleData = createSlice({
	name: "vehicleData",
	initialState,
	reducers: {
		setVehicles: (state, action: PayloadAction<VehicleData[]>) => {
			return [...action.payload];
		},
		addVehicle: (state, action: PayloadAction<VehicleData>) => {
			// state.unshift(action.payload);
			return [action.payload, ...state];
		},
	},
});

export const { setVehicles, addVehicle } = vehicleData.actions;

export default vehicleData.reducer;
