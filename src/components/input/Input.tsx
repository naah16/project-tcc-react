import { cn } from "@/utils/ui";

interface InputProps {
  type: 'text' | 'number' | 'password' | 'email' | 'checkbox' | 'tel' | 'url';
  id: string;
  value?: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  checked?: boolean;
  className?: string;
}

export default function Input({
  type,
  id,
  value,
  onChange,
  placeholder,
  checked,
  className,
}: InputProps) {
  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      checked={checked}
      className={cn(
        type === 'checkbox' 
          ? "h-4 w-4 mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
          : "w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
        , className
      )}
    />
  );
}