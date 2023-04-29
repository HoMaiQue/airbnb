"use client";
import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { useRegisterModal } from "@/app/hooks";
export default function UserMenu() {
    const registerModal = useRegisterModal()
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleToggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);
    return (
        <div className="relative ">
            <div className="flex flex-row items-center gap-3 ">
                <div className="hidden px-4 py-3 text-sm font-semibold transition rounded-full cursor-pointer md:block hover:bg-neutral-100">
                    Air your home
                </div>
                <div
                    onClick={handleToggleOpen}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center rounded-full cursor-pointer hover:shadow-md transition gap-3"
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="absolute shadow-md rounded-xl w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        <>
                        <MenuItem onClick={()=>{}} label="Login" />
                        <MenuItem onClick={registerModal.onOpen} label="SignUp" />
                        </>
                    </div>
                </div>
            )}
        </div>
    );
}
