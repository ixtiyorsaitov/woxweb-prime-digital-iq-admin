import { createAdmin, deleteAdmin, updateAdmin } from "@/lib/api/admin";
import { ROLE } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useCreateAdminMutation = () => {
  return useMutation({
    mutationFn: async ({
      name,
      email,
      role,
    }: {
      name: string;
      email: string;
      role: ROLE;
    }) => await createAdmin({ name, email, role }),
  });
};

export const useUpdateAdminMutation = () => {
  return useMutation({
    mutationFn: async ({
      id,
      name,
      email,
      role,
    }: {
      id: string;
      name: string;
      email: string;
      role: ROLE;
    }) => await updateAdmin({ id, name, email, role }),
  });
};

export const useDeleteAdminMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => await deleteAdmin(id),
  });
};
