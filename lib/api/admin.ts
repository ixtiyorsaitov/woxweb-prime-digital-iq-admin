import { ROLE } from "@/types";
import api from "../axios";

export const getAdmins = async ({
  search,
  page,
  limit,
}: {
  search: string;
  page: number;
  limit: number;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URI}/api/admins?search=${search}&page=${page}&limit=${limit}`
  );
  const data = await res.json();

  return data;
};

export const createAdmin = async ({
  name,
  email,
  role,
}: {
  name: string;
  email: string;
  role: ROLE;
}) => {
  const { data } = await api.post(`/admins`, { name, email, role });
  return data;
};

export const deleteAdmin = async (id: string) => {
  const { data } = await api.delete(`/admins/${id}`);
  return data;
};

export const updateAdmin = async ({
  id,
  name,
  email,
  role,
}: {
  id: string;
  name: string;
  email: string;
  role: ROLE;
}) => {
  const { data } = await api.put(`/admins/${id}`, { name, email, role });
  return data;
};
