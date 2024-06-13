import { cn } from "@/utils/ui";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  color: "primary" | "secondary" | "danger";
  type: "solid" | "flat";
  disabled?: boolean;
}

export default function Button({ children, onClick, className, color, type, disabled, ...props }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        type === "solid" && (
          color === "primary" ? `text-white  bg-blue-600 hover:bg-blue-500` :
          color === "secondary" ? `text-white bg-gray-600 hover:bg-gray-500` :
          color === "danger" ? `text-white  bg-red-600 hover:bg-red-500` :
          ''
        ) || type === "flat" && (
          color === "primary" ? `text-blue-600 border-2 border-blue-600 hover:bg-blue-200` :
          color === "secondary" ? `text-gray-600 border-2 border-gray-600 hover:bg-gray-200` :
          color === "danger" ? `text-red-600 border-2 border-red-600 hover:bg-red-200` :
          ''
        ),
        `flex items-center gap-2 text-sm px-4 py-2 rounded-xl ${className}`
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}