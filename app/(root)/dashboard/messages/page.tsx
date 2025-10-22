"use client";

import React from "react";
import MessagesMainPage from "./components";
import Loading from "./loading";
import { useGetMessagesQuery } from "@/hooks/useMessages";
import ErrorPage from "@/app/error";

const limit = 10;

const MessagesPage = () => {
  const { data: resp, isLoading } = useGetMessagesQuery({
    page: 1,
    limit: 10,
  });

  if (isLoading) return <Loading />;
  if (!isLoading && !resp.success) return <ErrorPage error={resp.error} />;
  return (
    <MessagesMainPage
      limit={limit}
      pagination={resp.pagination}
      datas={resp.datas}
    />
  );
};

export default MessagesPage;
