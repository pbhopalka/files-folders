import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";

export interface Folder {
  id?: number;
  name?: string;
  isOpen?: boolean;
  order?: number;
}

const queryConstants = {
  listFolders: ["folders"],
};

export const listFolders = () => {
  return useQuery(queryConstants.listFolders, () => api.get("/folders"), {
    select: (data) => data.data,
  });
};

export const addFolder = () => {
  const queryClient = useQueryClient();
  return useMutation((folder: Folder) => api.post("/folders", folder), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryConstants.listFolders);
    },
  });
};

export const updateFolder = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (folder: Folder) => api.put(`/folders/${folder.id}`, folder),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryConstants.listFolders);
      },
    }
  );
};

export const deleteFolder = () => {
  const queryClient = useQueryClient();
  return useMutation((id: number) => api.delete(`/folders/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryConstants.listFolders);
    },
  });
};
