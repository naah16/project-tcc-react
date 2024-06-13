import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import todosProps, { todosPropsPost } from "@/utils/interface/todos";

const todosApiRoute = "https://server-7m4zhbfadq-uc.a.run.app/todos";
const todosApiRouteCount = "https://server-7m4zhbfadq-uc.a.run.app/todos/count";

async function fetcher(url: string) {
	const resp = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!resp.ok) {
		const error = new Error("Não foi possível buscar as tarefas");
		throw error;
	}

	return resp.json();
}

async function getPageCount() {
	const resp = await fetch(todosApiRouteCount, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!resp.ok) {
		const error = new Error("Não foi possível buscar as tarefas");
		throw error;
	}

	return resp.json();
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
	const todosData: todosPropsPost = {
		id: arg.id,
		userId: arg.userId,
		title: arg.title,
		completed: arg.completed
	};

	const resp = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(todosData),
	});

	if (!resp.ok) {
		const error = new Error("Não foi possível adicionar a tarefa");
		throw error;
	}

	return resp.json();
}

async function deleteTodos(url: string, { arg }: { arg: { key: string } }) {
	const resp = await fetch(`${url}/${arg.key}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!resp.ok) {
		const error = new Error("Não foi possível deletar a tarefa");
		throw error;
	}

	return resp;
}

async function putTodos(
	url: string,
	{ arg }: {
		arg: {
			key: string;
			id: number,
			userId: number;
			title: string;
			completed: boolean;
		}
	}) {

	const todosData: todosProps = {
		key: arg.key,
		id: arg.id,
		userId: arg.userId,
		title: arg.title,
		completed: arg.completed
	};

	const resp = await fetch(`${url}/${arg.key}`, {
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

	return resp;
}

export default function useTodos(offset?: number, limit?: number) {
	const { data, mutate, error, isLoading } = useSWR(
		`${todosApiRoute}?offset=${offset}&limit=${limit}`,
		fetcher, {
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

	const { data: pageCount } = useSWR(todosApiRouteCount, getPageCount, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false
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
		isLoading,
		pageCount
	};
}
