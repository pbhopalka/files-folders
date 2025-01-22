import React from "react";
import { MantineProvider } from "@mantine/core";
import MainPage from "./components/MainPage";

const App: React.FC = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <MainPage />
    </MantineProvider>
  );
};

export default App;
