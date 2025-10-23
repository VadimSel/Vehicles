import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVehicles } from "../api/vehiclesApi";
import { AddVehicleModal } from "../components/AddVehicleModal";
import { setIsModalOpen } from "../store/modalSlice";
import { RootState } from "../store/store";
import { addVehicle, setVehicles } from "../store/vehiclesSlice";
import s from "./MainPage.module.scss";

export const MainPage = () => {
	const [itemId, setItemId] = useState<number>();
	const [isNameEdit, setIsNameEdit] = useState<boolean>(false);
	const [newName, setNewName] = useState<string>("");
	const [isPriceEdit, setIsPriceEdit] = useState<boolean>(false);
	const [newPrice, setNewPrice] = useState<number>(0);
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

	const editMode = (id: number, action: "name" | "price") => {
		setItemId(id);
		action === "name" ? setIsNameEdit(true) : setIsPriceEdit(true);
	};

	const saveNewName = () => {
		if (!itemId) return;

		const updatedVehicles = vehicles.map((v) =>
			v.id === itemId ? { ...v, name: newName } : v
		);
		dispatch(setVehicles(updatedVehicles));

		setIsNameEdit(false);
		setNewName("");
		setItemId(undefined);
	};

	useEffect(() => {
		getAllVehicles();
	}, []);

	return (
		<div className={`${s.container} ${isModalOpen && s.hiddenScroll}`}>
			{isModalOpen && <AddVehicleModal />}
			<button onClick={() => getAllVehicles()}>GetVen</button>
			<button onClick={() => dispatch(setIsModalOpen(true))}>
				Создать новую машину
			</button>{" "}
			{/* Понимаю что немного спорное решение оставлять логику в разметке, но мне показалось что одну строчку излишне выносить в отдельную функцию. В реальном проекте сделал бы так, как нужно */}
			<div>
				{vehicles.map((item) => {
					return (
						<div className={s.vehicleItem} key={item.id}>
							{isNameEdit && itemId === item.id ? (
								<>
									<input
										placeholder="Имя"
										onChange={(e: ChangeEvent<HTMLInputElement>) =>
											setNewName(e.currentTarget.value)
										}
									/>
									<button onClick={saveNewName}>Сохранить</button>
								</>
							) : (
								<p onClick={() => editMode(item.id, "name")}>Имя: {item.name}</p>
							)}
							<p>Модель: {item.model}</p>
							<p>Цвет: {item.color}</p>
							<p>Год: {item.year}</p>
							{isPriceEdit && itemId === item.id ? (
								<>
									<input type="text" placeholder="Цена"/>
									<button onClick={() => {}}>Сохранить</button>
								</>
							) : (
								<p>Цена: {item.price}</p>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};
