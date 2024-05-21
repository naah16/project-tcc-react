"use client"

import { mdiPencil, mdiPlus, mdiTrashCan, mdiCloseCircle } from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";
import useTodos from "@/hooks/use-todo";
import todosProps from "@/utils/interface/todos";
import Modal from "@/components/modal/Modal";
import Button from "@/components/button/Button";
import Input from "../input/Input";

export default function TodoList() {
	const initialData = {
		userId: 1,
		title: "",
		completed: false
	};
	const [data, setData] = useState(initialData);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
	const [taskToEdit, setTaskToEdit] = useState<todosProps | null>(null);
	const [editedTitle, setEditedTitle] = useState("");

	const { todos, error, isLoading, addTodos, updateTodo, removeTodo, mutate } = useTodos(true);
	
	async function handleSubmit() {
		if (data.title.trim() === "") {
			alert("O título da tarefa não pode estar vazio.");
			return;
		}

		const id: number = (todos?.reduce((maxId: number, item: todosProps) => Math.max(item.id, maxId), 0) + 1) || 1;
		const userId = Math.floor(Math.random() * 10) + 1;
		const title = data.title;
		const completed = false;

		console.log(title);

		try {
			await addTodos({ id, userId, title, completed }, {
				optimisticData: {
					id,
					userId,
					title,
					completed
				},
			});
			alert("Tarefa adicionada com sucesso!");
			mutate();
		} catch (error: any) {
			console.error(error.message);
		}
		setData({...data, userId: 1, title: "", completed: false});
	}

	async function handleDelete(id: number) {
		try {
			await removeTodo({ id }, {
				optimisticData: {
					id,
				},
			});
			alert("Tarefa deletada com sucesso!");
			mutate();
		} catch (error: any) {
			console.error(error.message);
		}
	}

	async function handleEdit() {
		if (taskToEdit) {
			if (editedTitle.trim() === "") {
				alert("O título da tarefa não pode estar vazio.");
				return;
			}
			try {
				await updateTodo({ ...taskToEdit, title: editedTitle }, {
					optimisticData: {
						...taskToEdit,
						title: editedTitle
					},
				});
				alert("Tarefa editada com sucesso!");
				mutate();
			} catch (error: any) {
				console.error(error.message);
			}
		}
	}

	async function handleToggleComplete(todo: todosProps) {
		try {
			await updateTodo({ ...todo, completed: !todo.completed }, {
				optimisticData: {
					...todo,
					completed: !todo.completed
				},
			});
			console.log("tafera estava completa?", todo.completed);
			mutate();
		} catch (error: any) {
			console.error(error.message);
		}
	}

	const openDeleteModal = (taskId: number) => {
		setTaskToDelete(taskId);
		setIsDeleteModalOpen(true);
	};

	const closeDeleteModal = () => {
		setTaskToDelete(null);
		setIsDeleteModalOpen(false);
	};

	const confirmDelete = () => {
		if (taskToDelete !== null) {
			handleDelete(taskToDelete);
			closeDeleteModal();
		}
	};

	const openEditModal = (task: todosProps) => {
		setTaskToEdit(task);
		setEditedTitle(task.title);
		setIsEditModalOpen(true);
	};

	const closeEditModal = () => {
		setTaskToEdit(null);
		setIsEditModalOpen(false);
	};

	const confirmEdit = () => {
		handleEdit();
		closeEditModal();
	};

	return (
		<div className="flex flex-col gap-4 border shadow-md rounded-lg p-6">
			<div className="flex justify-between gap-4">
				<div className="w-full flex flex-1">
					<Input
						id="add-task"
						type="text"
						placeholder="Digite o título da tarefa"
						value={data.title}
						onChange={(e) => setData({ ...data, title: e.target.value })}
					/>
				</div>
				<Button
					color="primary"
					type="solid"
					onClick={handleSubmit}
				>
					<Icon path={mdiPlus} size={0.8} />
					Adicionar
				</Button>
			</div>
			<ul className="flex flex-col gap-4">
				{todos && todos.length > 0 && (
					todos.toReversed().map((todo: todosProps) => (
						<li key={todo.id} className="py-4 px-2 flex items-center justify-between gap-2 rounded-lg bg-gray-100">
							<div className="flex items-center">
								<Input
									id={`item-todo-${todo.id}`}
									checked={todo.completed}
									onChange={() => handleToggleComplete(todo)}
									type="checkbox"
								/>
								<label
									htmlFor={`item-todo-${todo.id}`}
									className={`cursor-pointer select-none font-light text-gray-700 ${todo.completed ? 'line-through' : ''}`}
								>
									<span className="text-sm">{todo.title}</span>
								</label>
							</div>
							<div className="flex gap-4 items-center flex-wrap justify-end">
								<Button
									color="primary"
									type="flat"
									onClick={() => openEditModal(todo)}
								>
									<Icon path={mdiPencil} size={0.8} />
									Editar
								</Button>
								<Button
									color="danger"
									type="flat"
									onClick={() => openDeleteModal(todo.id)}
								>
									<Icon path={mdiTrashCan} size={0.8} />
									Excluir
								</Button>
							</div>
						</li>
					))
				)}
				{isLoading && (
					<li className="py-4 px-2 flex flex-col gap-4 items-center justify-center rounded-lg bg-gray-100">
						<div className="w-12 h-12 rounded-full animate-spin border-2 border-solid border-blue-500 border-t-transparent"></div>
						<span className="text-gray-500">Carregando tarefas...</span>
					</li>
				)}
				{error && (
					<li className="py-4 px-2 flex flex-col gap-4 items-center justify-center rounded-lg bg-gray-100">
						<Icon path={mdiCloseCircle} size={1} color={"#f00"} />
						<span className="text-red-500">Erro ao carregar tarefas.</span>
					</li>
				)}
			</ul>

			<Modal
				title="Excluir tarefa"
				isOpen={isDeleteModalOpen}
				onClose={closeDeleteModal}
				onConfirm={confirmDelete}
			>
				<p className="text-gray-700">Tem certeza que deseja excluir essa tarefa?</p>
			</Modal>

			<Modal
				title="Editar tarefa"
				isOpen={isEditModalOpen}
				onClose={closeEditModal}
				onConfirm={confirmEdit}
			>
				<Input
					id="edit-task"
					type="text"
					value={editedTitle}
					placeholder="Digite o novo título da tarefa"
					onChange={(e) => setEditedTitle(e.target.value)}
				/>
			</Modal>
		</div>
	);
}
