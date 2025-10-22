"use client";

import { Heading } from "@/components/core/heading";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IMessage } from "@/types/message";
import {
  CheckIcon,
  Edit,
  Mail,
  MoreVertical,
  ReplyIcon,
  Trash,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { format } from "date-fns";
import { PaginationType } from "@/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "sonner";
import { getPageNumbers } from "@/lib/utils";
import { getMessages } from "@/lib/api/message";
import { Badge } from "@/components/ui/badge";
import ReplyMessageModal, {
  DeleteMessageModal,
  DeleteReplyMessageModal,
  MessageModal,
} from "@/components/modals/message.modal";
import {
  useDeleteMessageModal,
  useDeleteReplyMessageModal,
  useMessageModal,
  useReplyMessageModal,
} from "@/hooks/use-modals";
import Loading from "../loading";

const MessagesMainPage = ({
  datas: defaultDatas,
  pagination: defaultPagination,
  limit,
}: {
  datas: IMessage[];
  pagination: PaginationType;
  limit: number;
}) => {
  const replyModal = useReplyMessageModal();
  const messageModal = useMessageModal();
  const deleteModal = useDeleteMessageModal();
  const deleteReplyMessageModal = useDeleteReplyMessageModal();
  const [loading, setLoading] = useState<boolean>(false);

  const [datas, setDatas] = useState<IMessage[]>(defaultDatas);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pagination, setPagination] =
    useState<PaginationType>(defaultPagination);

  const handlePageChange = async (page: number) => {
    setLoading(true);
    const newData = await getMessages({
      search: searchTerm,
      page,
      limit,
    });
    if (newData.error) {
      toast.error(newData.error);
      return;
    }
    setDatas(newData.datas);
    setPagination(newData.pagination);
    setLoading(false);
  };
  return loading ? (
    <Loading />
  ) : (
    <div className="w-full space-y-2">
      <Heading
        title={`Xabarlar`}
        description="Kelgan xabarlarni ko'rish va javob yozish"
      />
      <div className="w-full rounded-lg border bg-card">
        <Table className="w-full overflow-x-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Ism</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Xolati</TableHead>
              <TableHead>Javob</TableHead>
              <TableHead>Vaqt</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {datas.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  Hech qanday xabar topilmadi
                </TableCell>
              </TableRow>
            ) : (
              datas.map((message) => (
                <TableRow key={message._id}>
                  <TableCell className="font-medium">{message.name}</TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell>
                    {message.isRead ? (
                      <Badge
                        onClick={() => {
                          messageModal.setData(message);
                          messageModal.setOpen(true);
                        }}
                        className="cursor-pointer"
                        variant={"outline"}
                      >
                        {"O'qilgan"}
                        <CheckIcon />
                      </Badge>
                    ) : (
                      <Badge
                        onClick={() => {
                          messageModal.setData(message);
                          messageModal.setOpen(true);
                        }}
                        className="cursor-pointer"
                      >
                        Ochish
                        <Mail />
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {message.replied ? (
                      <span className="text-green-500">Javob berilgan</span>
                    ) : (
                      <span className="text-destructive text-sm">
                        Javob {"yo'q"}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {format(new Date(message.createdAt), "HH:mm | dd.MM.yyyy")}
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-muted rounded-full"
                        >
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Amallar menyusi</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            messageModal.setData(message);
                            messageModal.setOpen(true);
                          }}
                          className="cursor-pointer"
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          Xabarni ochish
                        </DropdownMenuItem>
                        {message.replied ? (
                          <DropdownMenuItem
                            onClick={() => {
                              replyModal.setData(message);
                              replyModal.setOpen(true);
                            }}
                            className="cursor-pointer"
                          >
                            <ReplyIcon className="mr-2 h-4 w-4" />
                            Javobni tahrirlash
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => {
                              replyModal.setData(message);
                              replyModal.setOpen(true);
                            }}
                            className="cursor-pointer"
                          >
                            <ReplyIcon className="mr-2 h-4 w-4" />
                            Javob berish
                          </DropdownMenuItem>
                        )}

                        <DropdownMenuSeparator />
                        {message.replied && (
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => {
                              deleteReplyMessageModal.setData(message);
                              deleteReplyMessageModal.setOpen(true);
                            }}
                            className="cursor-pointer"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            {"Javobni o'chirish"}
                          </DropdownMenuItem>
                        )}

                        <DropdownMenuItem
                          variant="destructive"
                          className="cursor-pointer text-destructive focus:text-destructive"
                          onClick={() => {
                            deleteModal.setData(message);
                            deleteModal.setOpen(true);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {"O'chirish"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {pagination.total > limit && (
        <Pagination className="mt-5 justify-end">
          <PaginationContent>
            {/* Prev tugmasi */}
            {pagination.hasPrevPage && (
              <PaginationItem>
                <PaginationPrevious
                  className="cursor-pointer"
                  onClick={() =>
                    pagination.page > 1 && handlePageChange(pagination.page - 1)
                  }
                />
              </PaginationItem>
            )}

            {/* Sahifa tugmalari */}
            {getPageNumbers(pagination).map((page, i) =>
              page === "..." ? (
                <PaginationItem key={`ellipsis-${i}`}>
                  <span className="px-2">...</span>
                </PaginationItem>
              ) : (
                <PaginationItem key={`page-${page}`} className="cursor-pointer">
                  <PaginationLink
                    isActive={page === pagination.page}
                    onClick={() => handlePageChange(page as number)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            {/* Next tugmasi */}
            {pagination.hasNextPage && (
              <PaginationItem>
                <PaginationNext
                  className="cursor-pointer"
                  onClick={() =>
                    pagination.page < pagination.totalPages &&
                    handlePageChange(pagination.page + 1)
                  }
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
      <ReplyMessageModal setDatas={setDatas} />
      <DeleteMessageModal setDatas={setDatas} />
      <MessageModal setDatas={setDatas} />
      <DeleteReplyMessageModal setDatas={setDatas} />
    </div>
  );
};

export default MessagesMainPage;
