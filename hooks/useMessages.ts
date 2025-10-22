import {
  deleteMessage,
  deleteReplyMessage,
  readMessage,
  replyMessage,
  updateRepliedMessage,
} from "@/lib/api/message";
import { useMutation } from "@tanstack/react-query";

export const useReplyMessageMutation = () => {
  return useMutation({
    mutationFn: async ({
      message,
      messageId,
    }: {
      message: string;
      messageId: string;
    }) => await replyMessage({ message, messageId }),
  });
};

export const useUpdateRepliedMessageMutation = () => {
  return useMutation({
    mutationFn: async ({
      message,
      messageId,
      resend,
    }: {
      message: string;
      messageId: string;
      resend: boolean;
    }) => await updateRepliedMessage({ message, messageId, resend }),
  });
};
export const useDeleteReplyMessageMutation = () => {
  return useMutation({
    mutationFn: async (messageId: string) =>
      await deleteReplyMessage(messageId),
  });
};

export const useDeleteMessageMutation = () => {
  return useMutation({
    mutationFn: async (messageId: string) => await deleteMessage(messageId),
  });
};

export const useReadMessageMutation = () => {
  return useMutation({
    mutationFn: async (messageId: string) => await readMessage(messageId),
  });
};
