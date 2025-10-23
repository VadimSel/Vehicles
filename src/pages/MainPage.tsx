import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVehicles } from "../api/vehiclesApi";
import { AddVehicleModal } from "../components/AddVehicleModal";
import { setIsModalOpen } from "../store/modalSlice";
import { RootState } from "../store/store";
import { setVehicles } from "../store/vehiclesSlice";
import s from "./MainPage.module.scss";

export const MainPage = () => {
	const isModalOpen = useSelector((state: RootState) => state.isModalOpen.value);
	const vehicles = useSelector((state: RootState) => state.vehicleData);
	const dispatch = useDispatch();

	const getAllVehicles = async () => {
		try {
			const vehiclesData = await getVehicles();
			dispatch(setVehicles(vehiclesData));
		} catch (error) {
			console.log(error);
		}
	};

	const addVehicle = () => {
		dispatch(setIsModalOpen(true));
	};

	useEffect(() => {
		getAllVehicles();
	}, []);

	return (
		<div className={`${s.container} ${isModalOpen && s.hiddenScroll}`}>
			{isModalOpen && <AddVehicleModal />}
			<button onClick={() => getAllVehicles()}>GetVen</button>
			<button onClick={() => addVehicle()}>Создать новую машину</button>
			<div>
				{vehicles.map((item) => {
					return (
						<div className={s.vehicleItem} key={item.id}>
							<p>Имя: {item.name}</p>
							<p>Модель: {item.model}</p>
							<p>Цвет: {item.color}</p>
							<p>Год: {item.year}</p>
							<p>Цена: {item.price}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};
