import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import todosProps from "@/utils/interface/todos";

const todosApiRoute = "http://localhost:8000/todos";

async function getTodos() {
	const resp = await fetch(todosApiRoute);

	if (!resp.ok) {
		const error = new Error("Não foi possível buscar as tarefas");
		throw error;
	}

	const data = await resp.json();

	return data;
}

async function postTodos(
	url: string,
	{ arg }: {
		arg: {
			id: number,
			userId: number;
			title: string;
			completed: boolean;
		}
	}) {
	const todosData: todosProps = {
		id: arg.id,
		userId: arg.userId,
		title: arg.title,
		completed: arg.completed
	};

	const resp = await fetch(url, {
		mode: "no-cors",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(todosData),
	});

	console.log(todosData);
	
	if (!resp.ok) {
		const error = new Error("Não foi possível adicionar a tarefa");
		throw error;
	}

	return await resp.json();
}

async function deleteTodos(url: string, { arg }: { arg: { id: number } }) {
	const resp = await fetch(`${url}/${arg.id}`, {
		method: "DELETE",
	});

	if (!resp.ok) {
		const error = new Error("Não foi possível deletar a tarefa");
		throw error;
	}

	return await resp.json();
}

async function putTodos(
	url: string,
	{ arg }: {
		arg: {
			id: number,
			userId: number;
			title: string;
			completed: boolean;
		}
	}) {
	const todosData: todosProps = {
		id: arg.id,
		userId: arg.userId,
		title: arg.title,
		completed: arg.completed
	};

	console.log(url, arg.id, todosData);

	const resp = await fetch(`${url}/${arg.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(todosData),
	});

	if (!resp.ok) {
		const error = new Error("Não foi possível atualizar a tarefa");
		throw error;
	}

	return await resp.json();
}

export default function useTodos(shouldFetch: boolean) {
	const { data, mutate, error, isLoading } = useSWR(
		shouldFetch ? [todosApiRoute] : null,
		() => getTodos(), {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false
	});

	const { trigger: addTodos } = useSWRMutation(todosApiRoute, postTodos, {
		revalidate: false
	});

	const { trigger: removeTodo } = useSWRMutation(todosApiRoute, deleteTodos, {
		revalidate: false
	});

	const { trigger: updateTodo } = useSWRMutation(todosApiRoute, putTodos, {
		revalidate: false
	});

	if (error) {
		console.error("Erro ao buscar as tarefas", error);
	}

	return {
		todos: data,
		addTodos,
		mutate,
		removeTodo,
		updateTodo,
		error,
		isLoading
	};
}
