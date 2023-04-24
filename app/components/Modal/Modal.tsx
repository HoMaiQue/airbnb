"use client";
import React, { useCallback, useEffect, useState } from "react";
import {IoMdClose} from "react-icons/io"
interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryLabel?: string;
}
const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryLabel,
}) => {
    const [showModal, setShowModal] = useState(isOpen);
    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) return;
        setShowModal(false);

        setTimeout(() => {
            onClose();
        }, 300);
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) return;
        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) return;
        secondaryAction();
    }, [disabled, secondaryAction]);

    if (!isOpen) return null;
    return (
        <>
            <div className="fixed inset-0 flex items-center overflow-x-hidden overflow-y-auto outline-none justify-content focus:outline-none bg-neutral-800/70">
                <div className="relative w-full h-full mx-auto my-6 md:w-4/6 lg:w-3/6 xl:w-2/5 lg:h-auto md:h-auto" >
                    <div className={`translate duration-300 h-full 
                        ${showModal ? "translate-y-0": "translate-y-full"}
                        ${showModal ? "opacity-100": "opacity-0"}
                    `} >

                         <div className="relative flex flex-col w-full h-full bg-white border-0 rounded-lg shadow-lg outline-none translate lg:h-auto md:h-auto focus:outline-none">
                            <div className="relative flex items-center justify-center p-6 rounded-t border-b-[1px] ">
                                <button onClick={handleClose} className="absolute p-1 transition border-0 hover:opacity-70 left-9">
                                    <IoMdClose size={18}></IoMdClose>
                                </button>
                                <div className="text-lg font-semibold">
                                    {title}
                                </div>
                            </div>
                            <div className="relative flex-auto p-6 ">{body}</div>
                            <div className="flex flex-col gap-2 p-6">
                                <div className="flex flex-row items-center w-full gap-4 ">
                                    <Button/>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Modal;
