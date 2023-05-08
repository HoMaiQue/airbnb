"use client";
import { useRegisterModal } from "@/app/hooks";
import { useLoginModal } from "@/app/hooks/useLoginModal";
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import { useRentModal } from "@/app/hooks/useRentModal";
interface UserMenuProps {
    currentUser?: SafeUser | null;
}
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal()
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleToggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);
    const handleRent = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        //    open rent modal
        rentModal.onOpen()
    }, [currentUser, loginModal, rentModal]);
    return (
        <div className="relative ">
            <div className="flex flex-row items-center gap-3 ">
                <div
                    onClick={handleRent}
                    className="hidden px-4 py-3 text-sm font-semibold transition rounded-full cursor-pointer md:block hover:bg-neutral-100"
                >
                    Air your home
                </div>
                <div
                    onClick={handleToggleOpen}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center rounded-full cursor-pointer hover:shadow-md transition gap-3"
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="absolute shadow-md rounded-xl w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <MenuItem onClick={() => {}} label="My trips" />
                                <MenuItem
                                    onClick={() => {}}
                                    label="My favorites"
                                />
                                <MenuItem
                                    onClick={() => {}}
                                    label="My reservations"
                                />
                                <MenuItem
                                    onClick={() => {}}
                                    label="My properties"
                                />
                                <MenuItem
                                    onClick={rentModal.onOpen}
                                    label="Airbnb my home"
                                />
                                <hr />
                                <MenuItem onClick={signOut} label="Log out" />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={loginModal.onOpen}
                                    label="Login"
                                />
                                <MenuItem
                                    onClick={registerModal.onOpen}
                                    label="SignUp"
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
export default UserMenu;
