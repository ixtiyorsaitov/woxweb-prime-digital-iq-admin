import {
  deleteMessage,
  deleteReplyMessage,
  readMessage,
  replyMessage,
  updateRepliedMessage,
} from "@/lib/api/message";
import api from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetMessagesQuery = ({
  page = 1,
  limit = 10,
}: {
  page: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const { data } = await api.get(`/messages?page=${page}&limit=${limit}`);

      return data;
    },
  });
};

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
