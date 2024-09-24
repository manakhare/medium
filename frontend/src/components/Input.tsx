import { ChangeEvent } from "react";

interface InputProps {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  type?: string;
}

const Input = ({ label, placeholder, onChange, type }: InputProps) => {

  return (
    <div className="flex flex-col justify-start p-1 my-1">
      <label className="font-bold text-lg my-1">{label}</label>
      <input onChange={onChange} className="p-2 border border-slate-300 outline-slate-400 rounded-lg" type={type || "text"} placeholder={placeholder} />
    </div>
  )
}

export default Input