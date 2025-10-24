import { useSelector } from "react-redux";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { RootState } from "../store/store";

export const PlacemarksMap = () => {
	const vehicles = useSelector((state: RootState) => state.vehicleData);
	const defaultData = { center: [59.95, 30.25], zoom: 9 };

	return (
		<YMaps>
			<div>
				<Map defaultState={defaultData}>
					{vehicles.map((item) => (
						<Placemark key={item.id} geometry={[item.latitude, item.longitude]} />
					))}
				</Map>
			</div>
		</YMaps>
	);
};
