"use client"

import { mdiArrowLeft } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";

export default function Sobre() {
	return (
		<div className="flex flex-col gap-4 p-6">
			<h1 className="text-2xl font-bold text-gray-900">Sobre a Aplicação</h1>
			<div className="flex flex-col gap-4">
				<p className="text-gray-700 text-base">
					Esta aplicação de lista de tarefas foi desenvolvida como parte do Trabalho de Conclusão de Curso (TCC) para demonstrar o uso de tecnologias modernas na construção de uma aplicação web funcional e interativa.
				</p>
				<p className="text-gray-700 text-base">
					O principal objetivo desta aplicação é fornecer uma interface simples e intuitiva para gerenciar tarefas diárias. As funcionalidades incluem adicionar, editar, excluir e marcar tarefas como concluídas.
				</p>
				<p className="text-gray-700 text-base">
					A aplicação foi desenvolvida utilizando as seguintes tecnologias:
				</p>
				<ul className="flex flex-col gap-2 list-none list-inside text-gray-700 border bg-gray-100 shadow-lg rounded-xl p-2">
					<li className="text-semibold">Next.js</li>
					<li className="text-semibold">React</li>
					<li className="text-semibold">TypeScript</li>
					<li className="text-semibold">Tailwind CSS</li>
					<li className="text-semibold">Icones do Material Design</li>
				</ul>
				<p className="text-gray-700 text-base">
					Esperamos que esta aplicação seja útil e demonstre de forma eficaz as capacidades das tecnologias escolhidas.
				</p>
				<div className="flex justify-end">
					<Link 
						href={"/"}
						className="flex gap-2 bg-gray-300 items-center text-sm px-4 py-2 rounded-xl text-blue-600 hover:underline"
					>
						<Icon path={mdiArrowLeft} size={0.8} />
						Ir para a Página Inicial
					</Link>
				</div>
			</div>
		</div>
	);
}
