import { createAdmin, deleteAdmin, updateAdmin } from "@/lib/api/admin";
import api from "@/lib/axios";
import { ROLE } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAdminsQuery = ({
  page = 1,
  limit = 10,
}: {
  page: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: ["admins"],
    queryFn: async () => {
      const { data } = await api.get(`/admins?page=${page}&limit=${limit}`);

      return data;
    },
  });
};

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
