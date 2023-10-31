import { SafeBoard, SafeCols } from "@/types";
import { create } from "zustand";

export type ModalType =  'createNewBoard' | 'createNewTask' | 'editBoard' | 'deleteBoard';

interface ModalData {
	apiUrl?: string;
	query?: Record<string, any>;
	cols?: SafeCols[] | null;
	board?: SafeBoard | null;
}
interface ModalStore {
	type: ModalType | null;
	data: ModalData;
	isOpen: boolean;
	onOpen: (type: ModalType, data?: ModalData) => void;
	onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
	type: null,
	data: {},
	isOpen: false,
	onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
	onClose: () => set({ type: null, isOpen: false, data: {} })
  }));