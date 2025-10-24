import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVehicles } from "../api/vehiclesApi";
import { AddVehicleModal } from "../components/AddVehicleModal";
import { PlacemarksMap } from "../components/PlacemarksMap";
import { setIsModalOpen } from "../store/modalSlice";
import { RootState } from "../store/store";
import { setVehicles } from "../store/vehiclesSlice";
import s from "./MainPage.module.scss";

export const MainPage = () => {
	const [sort, setSort] = useState<"asc" | "desc">("asc");
	const [itemId, setItemId] = useState<number | undefined>();
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
			console.log(error); // Понимаю что в реальном проекте ошибки так не выводятся, просто сделал заглушку
		}
	};

	const editMode = (id: number, action: "name" | "price") => {
		setItemId(id);
		setIsNameEdit(action === "name");
		setIsPriceEdit(action === "price");
	};

	const saveNewValue = () => {
		if (!itemId) return;

		const updatedVehicles = vehicles.map((v) =>
			v.id === itemId
				? {
						...v,
						...(isNameEdit ? { name: newName } : { price: newPrice }),
				  }
				: v
		);

		dispatch(setVehicles(updatedVehicles));

		setIsNameEdit(false);
		setIsPriceEdit(false);
		setNewName("");
		setNewPrice(0);
		setItemId(undefined);
	};

	const deleteVehicle = (id: number) => {
		const filteredVehicles = vehicles.filter((v) => v.id !== id);
		dispatch(setVehicles(filteredVehicles));
		id === itemId && setItemId(undefined);
	};

	const sortHandler = (action: "year" | "price") => {
		const sorted = [...vehicles].sort((a, b) =>
			sort === "asc" ? a[action] - b[action] : b[action] - a[action]
		);
		dispatch(setVehicles(sorted));
		setSort(sort === "asc" ? "desc" : "asc");
	};

	useEffect(() => {
		getAllVehicles();
	}, []);

	return (
		<div className={`${s.container} ${isModalOpen && s.hiddenScroll}`}>
			{isModalOpen && <AddVehicleModal />}
			<div className={s.tableAndMapContainer}>
				<table className={s.table}>
					<thead>
						<tr>
							<th>Имя</th>
							<th>Модель</th>
							<th>Цвет</th>
							<th onClick={() => sortHandler("year")}>Год</th>
							<th onClick={() => sortHandler("price")}>Цена</th>
							<th>Действия</th>
						</tr>
					</thead>
					<tbody>
						{vehicles.map((item) => (
							<tr key={item.id}>
								<td>
									{isNameEdit && itemId === item.id ? (
										<>
											<input
												placeholder="Имя"
												value={newName}
												onChange={(e: ChangeEvent<HTMLInputElement>) =>
													setNewName(
														e.currentTarget.value.replace(/[^A-Za-zА-Яа-я]/g, "")
													)
												}
											/>
											<button onClick={saveNewValue}>Сохранить</button>
										</>
									) : (
										<span onClick={() => editMode(item.id, "name")}>{item.name}</span>
									)}
								</td>
								<td>{item.model}</td>
								<td>{item.color}</td>
								<td>{item.year}</td>
								<td>
									{isPriceEdit && itemId === item.id ? (
										<>
											<input
												type="text"
												placeholder="Цена"
												value={newPrice}
												onChange={(e) =>
													setNewPrice(Number(e.currentTarget.value.replace(/\D/g, "")))
												}
											/>
											<button onClick={saveNewValue}>Сохранить</button>
										</>
									) : (
										<span onClick={() => editMode(item.id, "price")}>{item.price}</span>
									)}
								</td>
								<td>
									<button onClick={() => deleteVehicle(item.id)}>Удалить</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className={s.mapAndButtonContainer}>
					<button
						className={s.newVehicleButton}
						onClick={() => dispatch(setIsModalOpen(true))}
					>
						Создать новую машину
					</button>{" "}
					{/* Понимаю что немного спорное решение оставлять логику в разметке, но мне показалось что одну строчку излишне выносить в отдельную функцию. В реальном проекте сделал бы так, как нужно */}
					<PlacemarksMap />
				</div>
			</div>
		</div>
	);
};
