import axios from "axios";
import { VehicleData } from "../types/vehiclesTypes";

export const getVehicles = async (): Promise<VehicleData[]> => {
	try {
		const res = await axios.get("https://ofc-test-01.tspb.su/test-task/vehicles");
		return res.data;
	} catch (error) {
		throw error;
	}
};
