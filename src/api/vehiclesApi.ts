import axios from "axios";
import { VehiclesData } from "../types/vehiclesTypes";

export const getVehicles = async (): Promise<VehiclesData[]> => {
	try {
		const res = await axios.get("https://ofc-test-01.tspb.su/test-task/vehicles");
		return res.data;
	} catch (error) {
		throw error;
	}
};
