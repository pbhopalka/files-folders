import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { queryConstants } from "./queryConstants";

const socket = io("http://localhost:4000"); // Ensure this matches your backend

export const useItems = () => {
  const queryClient = useQueryClient();
  const [storage, setStorage] = useState<Record<string, string[]>>({
    root: [],
  });
  const [metadata, setMetadata] = useState<Record<string, any> | null>(null);

  // Fetch data from backend
  const { data, isLoading } = useQuery({
    queryKey: queryConstants.listItems,
    queryFn: async () => {
      const response = await api.get("/data");
      return response.data;
    },
  });

  const { data: itemMetadata, isLoading: isLoadingMetadata } = useQuery({
    queryKey: queryConstants.itemMetadata,
    queryFn: async () => {
      const response = await api.get("/item/metadata");
      return response.data;
    },
  });

  useEffect(() => {
    if (data) {
      setStorage(data);
    }
  }, [data]);

  useEffect(() => {
    if (itemMetadata) {
      setMetadata(itemMetadata);
    }
  }, [itemMetadata]);

  // WebSocket real-time updates
  useEffect(() => {
    socket.on("updateData", (updatedData) => {
      console.log(updatedData);
      setStorage(updatedData.storage);
      setMetadata(updatedData.itemMetadata);
      queryClient.invalidateQueries(queryConstants.listItems);
      queryClient.invalidateQueries(queryConstants.itemMetadata);
    });

    return () => {
      socket.off("updateData");
    };
  }, [queryClient]);

  // Add a new file
  const addFileMutation = useMutation(
    (newFile: { title: string; folderId?: string }) =>
      api.post("/files", newFile),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryConstants.itemMetadata);
        queryClient.invalidateQueries(queryConstants.listItems);
      },
    }
  );

  const addFile = (title: string, folderId = "root") => {
    addFileMutation.mutate({ title, folderId });
  };

  // Move an item (file or folder)
  const moveItemMutation = useMutation(
    (moveData: {
      itemId: string;
      fromFolderId: string;
      toFolderId: string;
      toIndex: number;
    }) => api.put("/move", moveData)
  );

  const moveItem = (
    itemId: string,
    fromFolderId: string,
    toFolderId: string,
    toIndex: number
  ) => {
    moveItemMutation.mutate({
      itemId,
      fromFolderId,
      toFolderId,
      toIndex,
    });
  };

  // Delete an item
  const deleteItemMutation = useMutation(
    (itemId: string) => api.delete(`/items/${itemId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryConstants.listItems);
        queryClient.invalidateQueries(queryConstants.listFolders);
        queryClient.invalidateQueries(queryConstants.itemMetadata);
      },
    }
  );

  const deleteItem = (itemId: string) => {
    deleteItemMutation.mutate(itemId);
  };

  return {
    storage,
    isLoading: isLoading || isLoadingMetadata,
    itemMetadata: metadata,
    addFile,
    moveItem,
    deleteItem,
  };
};
