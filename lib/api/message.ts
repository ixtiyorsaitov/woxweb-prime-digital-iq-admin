import api from "../axios";

export const getMessages = async ({
  search,
  page,
  limit,
}: {
  search: string;
  page: number;
  limit: number;
  
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URI}/api/messages?search=${search}&page=${page}&limit=${limit}`
  );
  const data = await res.json();

  return data;
};

export async function replyMessage({
  message,
  messageId,
}: {
  message: string;
  messageId: string;
}) {
  const { data } = await api.post(`/messages/${messageId}/reply`, { message });
  return data;
}

export async function updateRepliedMessage({
  message,
  messageId,
  resend,
}: {
  message: string;
  messageId: string;
  resend: boolean;
}) {
  const { data } = await api.put(`/messages/${messageId}/reply`, {
    message,
    resend,
  });
  return data;
}

export async function deleteReplyMessage(messageId: string) {
  const { data } = await api.delete(`/messages/${messageId}/reply`);
  return data;
}

export async function deleteMessage(messageId: string) {
  const { data } = await api.delete(`/messages/${messageId}`);
  return data;
}

export async function readMessage(messageId: string) {
  const { data } = await api.patch(`/messages/${messageId}`);
  return data;
}
