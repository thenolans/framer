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
    <div className="relative -translate-y-4">
      <input
        className="w-16 border-b border-gray-400 text-center outline-none focus:ring ring-amber-800 py-1"
        type="text"
        onChange={handleChange}
        {...props}
      />
      <div className="absolute top-0 right-1 text-gray-400">"</div>
    </div>
  );
}
