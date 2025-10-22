import { useAdminModal, useDeleteAdminModal } from "@/hooks/use-modals";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminFormSchema } from "@/lib/validations";
import { ROLE } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useUpdateAdminMutation,
} from "@/hooks/useAdmins";
import { toast } from "sonner";
import { Loader2, SaveIcon } from "lucide-react";
import { IUser } from "@/types/user";

const AdminModal = ({
  setDatas,
}: {
  setDatas: Dispatch<SetStateAction<IUser[]>>;
}) => {
  const adminModal = useAdminModal();
  const form = useForm<z.infer<typeof adminFormSchema>>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
      name: adminModal.data?.name || "",
      email: adminModal.data?.email || "",
      role:
        (adminModal.data?.role as ROLE.ADMIN | ROLE.SUPERADMIN) || ROLE.ADMIN,
    },
  });
  useEffect(() => {
    if (adminModal.data) {
      form.reset({
        name: adminModal.data.name || "",
        email: adminModal.data.email || "",
        role:
          (adminModal.data.role as ROLE.ADMIN | ROLE.SUPERADMIN) || ROLE.ADMIN,
      });
    } else {
      form.reset({
        name: "",
        email: "",
        role: ROLE.ADMIN,
      });
    }
  }, [adminModal.data, form]);

  const createMutation = useCreateAdminMutation();
  const updateMutation = useUpdateAdminMutation();
  const onSubmit = async (values: z.infer<typeof adminFormSchema>) => {
    if (adminModal.data) {
      updateMutation.mutate(
        {
          id: adminModal.data._id,
          name: values.name,
          email: values.email,
          role: values.role,
        },
        {
          onSuccess: (response) => {
            if (response.success) {
              toast.success("Admin tahrirlandi");
              setDatas((prev) =>
                prev.map((c) =>
                  c._id === response.data._id ? response.data : c
                )
              );
              adminModal.setOpen(false);
              adminModal.setData(null);
            } else {
              toast.error(response.error || "Adminni tahrirlashda xatolik");
            }
          },
        }
      );
    } else {
      createMutation.mutate(values, {
        onSuccess: (response) => {
          if (response.success) {
            toast.success("Admin qo'shildi");
            setDatas((prev) => [...prev, response.data]);
            adminModal.setOpen(false);
            adminModal.setData(null);
          } else {
            toast.error(response.error || "Adminni qo'shishda xatolik");
          }
        },
      });
    }
  };

  const loading = createMutation.isPending || updateMutation.isPending;
  return (
    <AlertDialog open={adminModal.open} onOpenChange={adminModal.setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {adminModal.data ? "Adminni tahrirlash" : "Admin qo'shish"}
          </AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ism</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Admin ismini kiriting"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="email"
                      placeholder="eshmat@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Rol tanlang" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent align="center">
                      <SelectItem value={ROLE.ADMIN}>Admin</SelectItem>
                      <SelectItem value={ROLE.SUPERADMIN}>
                        Super admin
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel
                disabled={loading}
                onClick={() => {
                  adminModal.setData(null);
                  adminModal.setOpen(false);
                }}
              >
                Bekor qilish
              </AlertDialogCancel>
              <Button type="submit" disabled={loading}>
                {adminModal.data ? "Saqlash" : "Qo'shish"}
                {loading ? <Loader2 className="animate-spin" /> : <SaveIcon />}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AdminModal;

export const DeleteAdminModal = ({
  setDatas,
}: {
  setDatas: Dispatch<SetStateAction<IUser[]>>;
}) => {
  const deleteModal = useDeleteAdminModal();
  const { mutate, isPending } = useDeleteAdminMutation();
  const handleSubmit = () => {
    if (!deleteModal.data) return;
    mutate(deleteModal.data._id, {
      onSuccess: (response) => {
        if (response.success) {
          setDatas((prev) => prev.filter((c) => c._id !== response.data._id));
          deleteModal.setData(null);
          deleteModal.setOpen(false);
          toast.success("Admin o'chirildi");
        } else {
          toast.error(response.error || "Admin o'chirishda xatolik");
        }
      },
    });
  };
  return (
    deleteModal.data && (
      <AlertDialog open={deleteModal.open} onOpenChange={deleteModal.setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Haqiqatdan ham {"o'chirmoqchimisiz?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Siz haqiqatdan ham{" "}
              <span className="text-foreground">{deleteModal.data.name}</span>{" "}
              ni {"o'chirib tashlamoqchimisiz"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                deleteModal.setData(null);
                deleteModal.setOpen(false);
              }}
            >
              Bekor qilish
            </AlertDialogCancel>
            <Button variant="destructive" onClick={handleSubmit}>
              {"O'chirish"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  );
};
