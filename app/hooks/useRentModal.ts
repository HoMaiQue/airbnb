import {create} from "zustand"

interface RenModalProps {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export const useRentModal = create<RenModalProps>((set)=> ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))