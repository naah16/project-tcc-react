import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import Button from "../button/Button";

interface ModalProps {
	title: string;
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
	onConfirm?: () => void;
}

export default function ModalComponent({
	title,
	children,
	isOpen,
	onClose,
	onConfirm
}: ModalProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
				<button
					type="button"
					className="absolute top-4 right-4 text-gray-400 hover:text-gray-900"
					onClick={onClose}
				>
					<Icon path={mdiClose} size={1} />
				</button>
				<h3 className="text-lg font-semibold mb-4">{title}</h3>
				<div className="mb-4">{children}</div>
				<div className="flex gap-2 justify-end">
					{onConfirm && (
						<Button color="primary" type="solid" onClick={onConfirm}>
							Confirmar
						</Button>
					)}
					<Button color="secondary" type="flat" onClick={onClose}>
						Cancelar
					</Button>
				</div>
			</div>
		</div>
	);
}
