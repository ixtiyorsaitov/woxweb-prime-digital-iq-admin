import { create } from "zustand";
import { IMessage } from "@/types/message";
import { IUser } from "@/types/user";

type ModalStore<T> = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: T | null;
  setData: (data: T | null) => void;
};

export const useReplyMessageModal = create<ModalStore<IMessage>>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  data: null,
  setData: (data) => set({ data }),
}));

export const useDeleteReplyMessageModal = create<ModalStore<IMessage>>()(
  (set) => ({
    open: false,
    setOpen: (open) => set({ open }),
    data: null,
    setData: (data) => set({ data }),
  })
);

export const useDeleteMessageModal = create<ModalStore<IMessage>>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  data: null,
  setData: (data) => set({ data }),
}));

export const useMessageModal = create<ModalStore<IMessage>>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  data: null,
  setData: (data) => set({ data }),
}));

export const useAdminModal = create<ModalStore<IUser>>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  data: null,
  setData: (data) => set({ data }),
}));

export const useDeleteAdminModal = create<ModalStore<IUser>>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  data: null,
  setData: (data) => set({ data }),
}));
