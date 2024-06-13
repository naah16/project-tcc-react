export default interface todosProps {
	key: string;
	id: number;
	userId: number;
	title: string;
	completed: boolean;
}

export interface todosPropsPost {
	id: number;
	userId: number;
	title: string;
	completed: boolean;
}