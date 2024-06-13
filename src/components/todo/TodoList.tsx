"use client"

import { mdiPencil, mdiPlus, mdiTrashCan, mdiCloseCircle } from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";
import useTodos from "@/hooks/use-todo";
import todosProps, { todosPropsPost } from "@/utils/interface/todos";
import Modal from "@/components/modal/Modal";
import Button from "@/components/button/Button";
import Input from "../input/Input";
import PaginationButtons from "../pagination/Pagination";
import Toast from "@/components/toast/Toast"

export default function TodoList() {
	const initialData = {
		userId: 1,
		title: "",
		completed: false
	};
	const [data, setData] = useState(initialData);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
	const [taskToEdit, setTaskToEdit] = useState<todosProps | null>(null);
	const [editedTitle, setEditedTitle] = useState("");
	const [isTitleEmpty, setIsTitleEmpty] = useState(false);
	const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
	const [offset, setOffset] = useState(0);
	const [limit] = useState(10);
	const [pageIndex, setPageIndex] = useState(0);

	const { todos, error, isLoading, addTodos, updateTodo, removeTodo, mutate, pageCount } = useTodos(offset, limit);

	const todosValue = todos && Object.values<todosProps>(todos).toReversed();

	async function handleSubmit() {
		if (data.title.trim() === "") {
			setIsTitleEmpty(true);
			return;
		}
		setIsTitleEmpty(false);

		const id: number = (Object.values<todosPropsPost>(todos)?.reduce((maxId: number, item: todosPropsPost) => Math.max(item.id, maxId), 0) + 1) || 1;
		const userId = Math.floor(Math.random() * 10) + 1;
		const title = data.title;
		const completed = false;

		try {
			await addTodos({ id, userId, title, completed }, {
				optimisticData: {
					id,
					userId,
					title,
					completed
				},
			});
			setToast({ message: 'Tarefa adicionada com sucesso!', type: 'success' });
			mutate();
		} catch (error: any) {
			console.error(error.message);
			setToast({ message: 'Erro ao adicionar tarefa.', type: 'error' });
		}
		setData({ ...data, userId: 1, title: "", completed: false });
	}

	async function handleDelete(key: string) {
		try {
			await removeTodo({ key }, {
				optimisticData: {
					key,
				},
			});
			setToast({ message: 'Tarefa deletada com sucesso!', type: 'success' });
			mutate();
		} catch (error: any) {
			console.error(error.message);
			setToast({ message: 'Erro ao deletar tarefa.', type: 'error' });
		}
	}

	async function handleEdit() {
		if (taskToEdit) {
			if (editedTitle.trim() === "") {
				setToast({ message: 'O título da tarefa não pode estar vazio.', type: 'error' });
				return;
			}
			try {
				await updateTodo({ ...taskToEdit, title: editedTitle }, {
					optimisticData: {
						...taskToEdit,
						title: editedTitle
					},
				});
				setToast({ message: 'Tarefa editada com sucesso!', type: 'success' });
				mutate();
			} catch (error: any) {
				setToast({ message: 'Erro ao editar tarefa.', type: 'error' });
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
			mutate();
		} catch (error: any) {
			console.error(error.message);
		}
	}

	const openDeleteModal = (key: string) => {
		setTaskToDelete(key);
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
			{toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
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
					<span className="hidden md:block">Adicionar</span>
				</Button>
			</div>
			{isTitleEmpty && <p className="text-red-500">O título da tarefa não pode estar vazio.</p>}
			<ul className="flex flex-col gap-4">
				{todos && todos.map((todo: todosProps) => (
					<li key={todo.key} className="py-4 px-2 flex items-center justify-between gap-2 rounded-lg bg-gray-100">
						<div className="flex items-center">
							<Input
								id={`item-todo-${todo.key}`}
								checked={(todo as todosProps).completed}
								onChange={() => handleToggleComplete(todo as todosProps)}
								type="checkbox"
							/>
							<label
								htmlFor={`item-todo-${todo.key}`}
								className={`cursor-pointer select-none font-light text-gray-700 ${(todo as todosProps).completed ? 'line-through' : ''}`}
							>
								<span className="text-sm">{(todo as todosProps).title}</span>
							</label>
						</div>
						<div className="flex gap-4 items-center flex-wrap justify-end">
							<Button
								color="primary"
								type="flat"
								onClick={() => openEditModal(todo as todosProps)}
							>
								<Icon path={mdiPencil} size={0.8} />
								<span className="hidden md:block">Editar</span>
							</Button>
							<Button
								color="danger"
								type="flat"
								onClick={() => openDeleteModal(todo.key as string)}
							>
								<Icon path={mdiTrashCan} size={0.8} />
								<span className="hidden md:block">Excluir</span>
							</Button>
						</div>
					</li>
				))}
				{todosValue?.length === 0 && !isLoading && (
					<li className="py-4 px-2 flex flex-col gap-4 items-center justify-center rounded-lg bg-gray-100">
						<span className="text-xl text-gray-500">Nenhuma tarefa encontrada.</span>
					</li>
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

			<PaginationButtons
        pageIndex={pageIndex}
        totalPage={pageCount && pageCount.count}
        onPageChange={(newPageIndex: number) => {
          setPageIndex(newPageIndex);
					setOffset(newPageIndex * limit);
        }}
      />

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
