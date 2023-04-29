"use client";

import { InputHTMLAttributes } from "react";
import {
    FieldError,
    FieldValues,
    RegisterOptions,
    UseFormRegister,
} from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    formatPrice?: boolean;
    register?: UseFormRegister<any>;
    rules?: RegisterOptions;
    label: string;
    errorMessage?: string;
}
const Input: React.FC<InputProps> = ({
    formatPrice,
    register,
    rules,
    errorMessage,
    name,
    label,
    ...rest
}) => {
    const registerResult = register && name ? register(name, rules) : null;
    return (
        <div className="relative w-full ">
            {formatPrice && (
                <BiDollar
                    size={24}
                    className="absolute text-neutral-700 top-5 left-2"
                />
            )}
            <input
                type="text"
                className={`peer w-full p-4 pt-6 font-light bg-white rounded-md border-2 outline-none 
                transition disabled:opacity-70 disabled:cursor-not-allow ${
                    formatPrice ? "pl-9" : "pl-4"
                }
                ${
                    errorMessage
                        ? "border-rose-500 focus:border-rose-500"
                        : "border-neutral-300 focus:border-black"
                }
               
                `}
                {...registerResult}
                {...rest}
            />
            <label
                className={`absolute z-10 duration-150 transform -translate-y-3 text-md top-5 origin-[0]
                 ${formatPrice ? "left-9" : "left-4"} 
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4
                 ${errorMessage ? "text-rose-500" : "text-zinc-400"}`}
            >
                {label}
            </label>
        </div>
    );
};

export default Input;
