import { InputHTMLAttributes } from "react";

export default function Input({
  onChange,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (isNaN(Number(e.target.value))) {
      return;
    }
    onChange?.(e);
  }
  return (
    <div className="relative">
      <input
        className="h-12 rounded-lg border-gray-300 border-3 w-24 text-center outline-none focus:border-orange-900"
        type="text"
        onChange={handleChange}
        {...props}
      />
      <div className="absolute top-2 right-6 text-gray-300">"</div>
    </div>
  );
}
