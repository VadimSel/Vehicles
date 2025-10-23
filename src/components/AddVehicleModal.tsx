import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { setIsModalOpen } from "../store/modalSlice";
import { addVehicle } from "../store/vehiclesSlice";
import { VehicleData } from "../types/vehiclesTypes";
import s from "./AddVehicleModal.module.scss";

export const AddVehicleModal = () => {
	const dispatch = useDispatch();

	const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const newData: VehicleData = {
			name: fd.get("name")?.toString() || "",
			model: fd.get("model")?.toString() || "",
			year: Number(fd.get("year")) || 0,
			color: fd.get("color")?.toString() || "",
			price: Number(fd.get("price")) || 0,
			id: Math.floor(Date.now() + Math.random() * 100),
			latitude: Math.random() * 180 - 90,
			longitude: Math.random() * 360 - 180,
		};
		dispatch(addVehicle(newData));
		dispatch(setIsModalOpen(false));
	};

	return (
		<div className={s.background}>
			<form
				className={s.container}
				onSubmit={(e) => {
					onSubmitHandler(e);
				}}
			>
				<input type="text" placeholder="Имя" name="name" />
				<input type="text" placeholder="Модель" name="model" />
				<input type="text" placeholder="Год" name="year" />
				<input type="text" placeholder="Цвет" name="color" />
				<input type="text" placeholder="Цена" name="price" />
				<button type="submit">Создать</button>
				<button type="button" onClick={() => dispatch(setIsModalOpen(false))}>
					Отмена
				</button>
			</form>
		</div>
	);
};
