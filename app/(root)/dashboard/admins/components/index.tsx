"use client";

import { getAdmins } from "@/lib/api/admin";
import { PaginationType, ROLE } from "@/types";
import { IUser } from "@/types/user";
import React, { useState } from "react";
import { toast } from "sonner";
import Loading from "../loading";
import { Heading } from "@/components/core/heading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, Edit2, MoreVertical, PlusIcon, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useAdminModal, useDeleteAdminModal } from "@/hooks/use-modals";
import AdminModal, { DeleteAdminModal } from "@/components/modals/admin.modal";
import { UserAvatarProfile } from "@/components/core/user-avatar-profile";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPageNumbers } from "@/lib/utils";

const AdminsPageMain = ({
  limit,
  pagination: defaultPagination,
  datas: defaultDatas,
}: {
  limit: number;
  pagination: PaginationType;
  datas: IUser[];
}) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);

  const adminModal = useAdminModal();
  const deleteModal = useDeleteAdminModal();

  const [datas, setDatas] = useState<IUser[]>(defaultDatas);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pagination, setPagination] =
    useState<PaginationType>(defaultPagination);

  const handlePageChange = async (page: number) => {
    setLoading(true);
    const newData = await getAdmins({
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
      <div className="flex items-center justify-between">
        <Heading title={`Adminlar`} description="" />
        {session?.currentUser.role === ROLE.SUPERADMIN && (
          <Button
            onClick={() => {
              adminModal.setData(null);
              adminModal.setOpen(true);
            }}
          >
            <PlusIcon />
            {"Qo'shish"}
          </Button>
        )}
      </div>
      <div className="w-full rounded-lg border bg-card">
        <Table className="w-full overflow-x-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Ism</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Yaratilgan sana</TableHead>
              {session?.currentUser.role === ROLE.SUPERADMIN && <TableHead />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {datas.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={
                    session?.currentUser.role === ROLE.SUPERADMIN ? 5 : 4
                  }
                  className="text-center py-8 text-muted-foreground"
                >
                  Hech qanday admin topilmadi.
                </TableCell>
              </TableRow>
            ) : (
              datas.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">
                    <div className="flex gap-2 items-center justify-start">
                      <UserAvatarProfile user={item} />
                      {item.name}
                    </div>
                  </TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.role}</TableCell>

                  <TableCell>
                    {format(new Date(item.createdAt), "HH:mm | dd.MM.yyyy")}
                  </TableCell>
                  {session?.currentUser.role === ROLE.SUPERADMIN && (
                    <TableCell className="text-center">
                      {session.currentUser._id !== item._id && (
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
                                adminModal.setData(item);
                                adminModal.setOpen(true);
                              }}
                              className="cursor-pointer"
                            >
                              <Edit />
                              Tahrirlash
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              variant="destructive"
                              className="cursor-pointer text-destructive focus:text-destructive"
                              onClick={() => {
                                deleteModal.setData(item);
                                deleteModal.setOpen(true);
                              }}
                            >
                              <Trash2 />
                              {"O'chirish"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  )}
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
      <AdminModal setDatas={setDatas} />
      <DeleteAdminModal setDatas={setDatas} />
    </div>
  );
};

export default AdminsPageMain;
