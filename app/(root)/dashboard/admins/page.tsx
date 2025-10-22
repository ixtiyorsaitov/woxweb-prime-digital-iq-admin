import { getAdmins } from "@/lib/api/admin";
import React from "react";
import { toast } from "sonner";
import AdminsPageMain from "./components";

const limit = 10;

const AdminsPage = async () => {
  const resp = await getAdmins({
    search: "",
    page: 1,
    limit,
  });

  if (!resp.success) toast.error(resp.error);
  return (
    <AdminsPageMain
      limit={limit}
      pagination={resp.pagination}
      datas={resp.datas}
    />
  );
};

export default AdminsPage;
