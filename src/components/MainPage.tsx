import { getVehicles } from "../api/vehiclesApi";

export const MainPage = () => {
	const GetAllVehicles = async () => {
		const vehicles = await getVehicles();
		console.log(vehicles);
	};

	return (
		<div>
			<button onClick={() => GetAllVehicles()}>GetVen</button>
		</div>
	);
};
