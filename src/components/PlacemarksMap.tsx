import { useSelector } from "react-redux";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { RootState } from "../store/store";
import s from "./PlacemarksMap.module.scss";

export const PlacemarksMap = () => {
	const vehicles = useSelector((state: RootState) => state.vehicleData);
	const defaultData = { center: [59.95, 30.25], zoom: 9 };

	return (
		<YMaps>
			<Map className={s.map} defaultState={defaultData}>
				{vehicles.map((item) => (
					<Placemark key={item.id} geometry={[item.latitude, item.longitude]} />
				))}
			</Map>
		</YMaps>
	);
};
