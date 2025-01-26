import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import { queryConstants } from "./queryConstants";

export const useFolders = () => {
  const queryClient = useQueryClient();

  // Fetch folders
  const { data: storage, isLoading } = useQuery(
    queryConstants.listFolders,
    async () => {
      const response = await api.get("/data");
      return response.data;
    }
  );

  // Add a new folder
  const addFolderMutation = useMutation(
    (newFolder: { name: string; parentId?: string }) =>
      api.post("/folders", newFolder),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryConstants.listFolders);
        queryClient.invalidateQueries(queryConstants.itemMetadata);
      },
    }
  );

  const addFolder = (name: string, parentId = "root") => {
    addFolderMutation.mutate({ name, parentId });
  };

  const updateFolderMutation = useMutation(
    (updateReq: { folderId: string; isOpen: boolean }) =>
      api.put("/folders", updateReq),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryConstants.itemMetadata);
      },
    }
  );
  const updateFolderState = (itemId: string, isOpen: boolean) => {
    updateFolderMutation.mutate({ folderId: itemId, isOpen });
  };

  return { storage, isLoading, addFolder, updateFolderState };
};
