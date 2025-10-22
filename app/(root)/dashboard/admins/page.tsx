"use client";

import React from "react";
import AdminsPageMain from "./components";
import Loading from "./loading";
import ErrorPage from "@/app/error";
import { useGetAdminsQuery } from "@/hooks/useAdmins";

const limit = 10;

const AdminsPage = () => {
  const { data: resp, isLoading } = useGetAdminsQuery({
    page: 1,
    limit: 10,
  });

  if (isLoading) return <Loading />;
  if (!isLoading && !resp.success) return <ErrorPage error={resp.error} />;
  return (
    <AdminsPageMain
      limit={limit}
      pagination={resp.pagination}
      datas={resp.datas}
    />
  );
};

export default AdminsPage;
