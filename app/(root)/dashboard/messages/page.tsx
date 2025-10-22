import React from "react";
import MessagesMainPage from "./components";
import { getMessages } from "@/lib/api/message";
import { toast } from "sonner";

const limit = 10;

const MessagesPage = async () => {
  const resp = await getMessages({
    search: "",
    page: 1,
    limit,
  });

  if (!resp.success) toast.error(resp.error);
  return (
    <MessagesMainPage
      limit={limit}
      pagination={resp.pagination}
      datas={resp.datas}
    />
  );
};

export default MessagesPage;
