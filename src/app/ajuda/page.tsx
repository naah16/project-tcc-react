"use client"

import { mdiHelpCircle } from "@mdi/js";
import Icon from "@mdi/react";
import Button from "@/components/button/Button";
import Link from "next/link";

export default function Ajuda() {
	return (
		<div className="flex flex-col gap-4 border shadow-md rounded-lg p-6">
			<h1 className="text-2xl font-bold text-gray-900">Ajuda</h1>
			<div className="flex flex-col gap-4">
				<p className="text-gray-700 text-base">
					Bem-vindo(a) à página de ajuda da nossa aplicação de lista de tarefas! Aqui você encontrará informações sobre como usar a aplicação e aproveitar ao máximo seus recursos.
				</p>
				<h2 className="text-xl font-semibold text-gray-900">Funcionalidades Principais</h2>
				<ul className="flex flex-col gap-2 list-none list-inside text-gray-700 border bg-gray-100 shadow-lg rounded-xl p-2">
					<li><strong>Adicionar Tarefas:</strong> Use o campo de entrada no topo da página para adicionar novas tarefas. Digite o título da tarefa e clique no botão "Adicionar".</li>
					<li><strong>Editar Tarefas:</strong> Clique no botão de "Editar" ao lado de uma tarefa para editá-la. Altere o título e confirme.</li>
					<li><strong>Excluir Tarefas:</strong> Clique no botão de "Excluir" ao lado de uma tarefa para excluí-la. Confirme a exclusão na janela modal.</li>
					<li><strong>Marcar como Concluída:</strong> Clique na caixa de seleção ao lado do título da tarefa para marcá-la como concluída ou não concluída.</li>
				</ul>
				<h2 className="text-xl font-semibold text-gray-900">Perguntas Frequentes</h2>
				<div className="flex flex-col gap-2">
					<div>
						<h3 className="text-lg font-semibold text-gray-900">Como adicionar uma nova tarefa?</h3>
						<p className="text-gray-700 text-base">
							Para adicionar uma nova tarefa, digite o título da tarefa no campo de entrada no topo da página e clique no botão "Adicionar". A nova tarefa aparecerá na lista abaixo.
						</p>
					</div>
					<div>
						<h3 className="text-lg font-semibold text-gray-900">Como editar uma tarefa existente?</h3>
						<p className="text-gray-700 text-base">
							Para editar uma tarefa existente, clique no ícone de lápis ao lado da tarefa que você deseja editar. Isso abrirá uma janela modal onde você pode alterar o título da tarefa. Clique em "Salvar" para confirmar as alterações.
						</p>
					</div>
					<div>
						<h3 className="text-lg font-semibold text-gray-900">Como excluir uma tarefa?</h3>
						<p className="text-gray-700 text-base">
							Para excluir uma tarefa, clique no ícone de lixeira ao lado da tarefa que você deseja excluir. Você será solicitado a confirmar a exclusão na janela modal. Clique em "Excluir" para confirmar.
						</p>
					</div>
					<div>
						<h3 className="text-lg font-semibold text-gray-900">Como marcar uma tarefa como concluída?</h3>
						<p className="text-gray-700 text-base">
							Para marcar uma tarefa como concluída, clique na caixa de seleção ao lado do título da tarefa. A tarefa será riscada para indicar que está concluída. Clique novamente para desmarcá-la como concluída.
						</p>
					</div>
				</div>
				<div className="flex justify-end">
					<Link
						href={"https://tinyurl.com/ysyt2azn"}
						className="flex gap-2 bg-gray-300 items-center text-sm px-4 py-2 rounded-xl text-blue-600 hover:underline"
					>
						<Icon path={mdiHelpCircle} size={0.8} />
						Contatar Suporte
					</Link>
				</div>
			</div>
		</div>
	);
}
