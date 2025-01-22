import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";

export interface Item {
  id?: number;
  title?: string;
  icon?: string;
  folderId?: number;
  order?: number;
}

const queryConstants = {
  listItems: ["items"],
};

export const listItems = () => {
  return useQuery(queryConstants.listItems, () => api.get("/items"), {
    select: (data) => data.data,
  });
};

export const addItem = () => {
  const queryClient = useQueryClient();
  return useMutation((item: Item) => api.post("/items", item), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryConstants.listItems);
    },
  });
};

export const updateItem = () => {
  const queryClient = useQueryClient();
  return useMutation((item: Item) => api.put(`/items/${item.id}`, item), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryConstants.listItems);
    },
  });
};

export const deleteItem = () => {
  const queryClient = useQueryClient();
  return useMutation((id: number) => api.delete(`/items/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryConstants.listItems);
    },
  });
};
