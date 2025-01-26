import React from "react";
import { MantineProvider } from "@mantine/core";
import MainPage from "./components/MainPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App: React.FC = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      // queries: {
      //   gcTime: 1000 * 60 * 60 * 24, // 24 hours
      // },
    },
  });

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <QueryClientProvider client={queryClient}>
        <MainPage />
      </QueryClientProvider>
    </MantineProvider>
  );
};

export default App;
