import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { enUS, uz } from "date-fns/locale";
import {
  useDeleteMessageModal,
  useDeleteReplyMessageModal,
  useMessageModal,
  useReplyMessageModal,
} from "@/hooks/use-modals";
import { IMessage } from "@/types/message";
import { useForm } from "react-hook-form";
import { replyMessageSchema } from "@/lib/validations";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import {
  useDeleteMessageMutation,
  useDeleteReplyMessageMutation,
  useReadMessageMutation,
  useReplyMessageMutation,
  useUpdateRepliedMessageMutation,
} from "@/hooks/useMessages";
import { toast } from "sonner";
import {
  CheckCircle2,
  ClockIcon,
  Loader2,
  MailIcon,
  MessageCircle,
  Trash2,
  UserIcon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

const ReplyMessageModal = ({
  setDatas,
}: {
  setDatas: Dispatch<SetStateAction<IMessage[]>>;
}) => {
  const [resend, setResend] = useState<boolean>(false);
  const form = useForm<z.infer<typeof replyMessageSchema>>({
    resolver: zodResolver(replyMessageSchema),
    defaultValues: {
      message: "",
    },
  });
  const { open, data, setOpen, setData } = useReplyMessageModal();
  useEffect(() => {
    if (data?.replied) {
      form.reset({ message: data.replied });
    } else {
      form.reset({ message: "" });
    }
  }, [data]);
  const replyMessageMutation = useReplyMessageMutation();
  const updateRepliedMessageMutation = useUpdateRepliedMessageMutation();
  function onSubmit(values: z.infer<typeof replyMessageSchema>) {
    if (!data) return;
    if (data.replied) {
      updateRepliedMessageMutation.mutate(
        {
          message: values.message,
          messageId: data._id,
          resend: true,
        },
        {
          onSuccess: (res) => {
            if (res.success) {
              toast.success("Javob yangilandi");
              setDatas((prev) =>
                prev.map((c) => (c._id === data._id ? res.data : c))
              );
              setData(null);
              setOpen(false);
            } else {
              toast.error(res.error);
            }
          },
        }
      );
    } else {
      replyMessageMutation.mutate(
        {
          message: values.message,
          messageId: data._id,
        },
        {
          onSuccess: (res) => {
            if (res.success) {
              toast.success("Javob yuborildi");
              setDatas((prev) =>
                prev.map((c) => (c._id === data._id ? res.data : c))
              );
              setData(null);
              setOpen(false);
            } else {
              toast.error(res.error);
            }
          },
        }
      );
    }
  }
  const loading =
    replyMessageMutation.isPending || updateRepliedMessageMutation.isPending;
  return (
    data && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <DialogHeader>
                <DialogTitle>Javob berish</DialogTitle>
                <DialogDescription>
                  {"Xabarga javob berish uchun kerakli maydonni to'ldiring"}
                </DialogDescription>
              </DialogHeader>
              <div className="w-full">
                <p>Xabar</p>
                <Textarea
                  value={data.message}
                  disabled
                  className="max-h-[150px]"
                />
              </div>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Javob</FormLabel>
                    <FormControl>
                      <Textarea
                        className="max-h-[150px]"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Javobingiz{" "}
                      <span className="text-foreground">{data.email}</span> ga
                      boradi
                    </FormDescription>
                  </FormItem>
                )}
              />
              {data.replied && (
                <div className="flex items-center justify-start gap-3">
                  <Switch
                    id="resend"
                    checked={resend}
                    onCheckedChange={setResend}
                  />
                  <Label htmlFor="resend">{"Qayta jo'natish"}</Label>
                </div>
              )}
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    disabled={loading}
                    onClick={() => {
                      setOpen(false);
                      setData(null);
                    }}
                    variant="outline"
                  >
                    Bekor qilish
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={loading}>
                  {data.replied ? "Saqlash" : "Yuborish"}
                  {loading && <Loader2 className="animate-spin" />}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    )
  );
};

export default ReplyMessageModal;

export const DeleteReplyMessageModal = ({
  setDatas,
}: {
  setDatas: Dispatch<SetStateAction<IMessage[]>>;
}) => {
  const deleteMessageMutation = useDeleteReplyMessageMutation();
  const { open, setOpen, data, setData } = useDeleteReplyMessageModal();
  const handleSubmit = () => {
    if (!data) return;
    deleteMessageMutation.mutate(data._id, {
      onSuccess: (res) => {
        if (res.success) {
          toast.success("Javobingiz olib tashlandi");
          setDatas((prev) =>
            prev.map((c) => (c._id === data._id ? res.data : c))
          );
          setData(null);
          setOpen(false);
        } else {
          toast.error(res.error);
        }
      },
    });
  };
  return (
    data?.replied && (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{"Xabarni o'chirmoqchimisiz?"}</AlertDialogTitle>
            <AlertDialogDescription>
              Siz haqiqatdan ham{" "}
              <span className="text-foreground">{data.email}</span> yozgan
              habaridan javobingizni {"o'chirmoqchimisiz?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="w-full">
            <p>Xabar</p>
            <Textarea value={data.message} disabled className="max-h-[100px]" />
          </div>
          <div className="w-full">
            <p>Javob</p>
            <Textarea value={data.replied} disabled className="max-h-[100px]" />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={deleteMessageMutation.isPending}
              onClick={() => {
                setOpen(false);
                setData(null);
              }}
            >
              Bekor qilish
            </AlertDialogCancel>
            <Button
              disabled={deleteMessageMutation.isPending}
              variant={"destructive"}
              onClick={handleSubmit}
            >
              {"O'chirish"}
              {deleteMessageMutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Trash2 />
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  );
};

export const DeleteMessageModal = ({
  setDatas,
}: {
  setDatas: Dispatch<SetStateAction<IMessage[]>>;
}) => {
  const deleteMessageMutation = useDeleteMessageMutation();
  const { open, setOpen, data, setData } = useDeleteMessageModal();
  const handleSubmit = () => {
    if (!data) return;
    deleteMessageMutation.mutate(data._id, {
      onSuccess: (res) => {
        if (res.success) {
          toast.success("Xabar o'chirildi");
          setDatas((prev) => prev.filter((c) => c._id !== data._id));
          setData(null);
          setOpen(false);
        } else {
          toast.error(res.error);
        }
      },
    });
  };
  return (
    data && (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{"Xabarni o'chirmoqchimisiz?"}</AlertDialogTitle>
            <AlertDialogDescription>
              Siz haqiqatdan ham{" "}
              <span className="text-foreground">{data.email}</span> yozgan
              habarini {"o'chirmoqchimisiz"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="w-full">
            <p>Xabar</p>
            <Textarea value={data.message} disabled className="max-h-[250px]" />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={deleteMessageMutation.isPending}
              onClick={() => {
                setOpen(false);
                setData(null);
              }}
            >
              Bekor qilish
            </AlertDialogCancel>
            <Button
              disabled={deleteMessageMutation.isPending}
              variant={"destructive"}
              onClick={handleSubmit}
            >
              {"O'chirish"}
              {deleteMessageMutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Trash2 />
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  );
};

export function MessageModal({
  setDatas,
}: {
  setDatas: Dispatch<SetStateAction<IMessage[]>>;
}) {
  const { open, setOpen, data, setData } = useMessageModal();
  const replyModal = useReplyMessageModal();
  const readMessageMutation = useReadMessageMutation();
  useEffect(() => {
    if (data && !data.isRead) {
      readMessageMutation.mutate(data._id, {
        onSuccess: (res) => {
          if (res.success) {
            // toast.success("Xabar o'qildi");
            setData(res.data);
            setDatas((prev) =>
              prev.map((c) => (c._id === data._id ? res.data : c))
            );
          } else {
            toast.error(res.error);
          }
        },
      });
    }
  }, [data?._id]);
  if (!data) return null;
  const formattedDate = data.createdAt
    ? format(new Date(data.createdAt), "MMMM d, yyyy, HH:mm", {
        locale: uz,
      })
    : "No date";
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Xabar tafsilotlari
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Sender Info */}
          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <UserIcon className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{data.name}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MailIcon className="w-4 h-4" />
                {data.email}
              </p>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm">
              <ClockIcon className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{formattedDate}</span>
            </div>
            <Badge>
              {!data.isRead && readMessageMutation.isPending ? (
                <>
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  {"O'qilmoqda..."}
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {"O'qilgan"}
                </>
              )}
            </Badge>
          </div>

          <Separator />

          {/* Message Content */}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Xabar</h3>
            <Textarea
              value={data.message}
              disabled
              className="max-h-[300px] w-full"
            />
          </div>

          {/* Reply Section */}
          {data.replied ? (
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Javobingiz</h3>
              <Textarea
                value={data.replied}
                disabled
                className="max-h-[300px] w-full"
              />
            </div>
          ) : (
            <div className="p-4 bg-muted rounded-lg border">
              <p className="text-sm text-muted-foreground">
                Xali javob berilmagan. Javob berish uchun{" "}
                <span className="text-foreground">{`"Javob berish" `}</span>
                tugmasiga bosing
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false);
              setData(null);
            }}
          >
            Yopish
          </Button>
          {!data.replied && (
            <Button
              onClick={() => {
                setOpen(false);
                replyModal.setData(data);
                setData(null);
                replyModal.setOpen(true);
              }}
            >
              Javob berish
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// 2.Reply message ni update qilish
// 3.Reply message ni o'chirish
// 4.Users page
// 5.UI ga ulash
