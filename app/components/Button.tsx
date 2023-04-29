"use client";
import React from "react";
import { IconType } from "react-icons/lib";
interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
}
const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon,
}) => {
    return (
        <button
            className={`relative disabled:opacity-70 disabled:cursor-not-allowed
        rounded-lg hover:opacity-80 w-full 
        ${
            outline
                ? "bg-white border-black py-1 "
                : "bg-rose-500 py-3 border-rose-500 text-white"
        }
      
        ${
            small
                ? "text-black text-sm font-light border-[1px]"
                : "border-[2px] text-black text-md font-semibold"
        }
       
    `}
            onClick={onClick}
            disabled={disabled}
            
        
        >
            {Icon && <Icon className="absolute gap-4 -full t left-4 " size={24}></Icon>}
            {label}
        </button>
    );
};
export default Button;
