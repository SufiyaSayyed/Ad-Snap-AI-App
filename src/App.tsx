import { Route, Routes } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import ImageGeneration from "./pages/ImageGeneration";
import EraseElement from "./pages/EraseElement";
import GenFill from "./pages/GenFill";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GenBackground from "./pages/GenBackground";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* Public routes */}
        <Route element={<MainLayout />}>
          <Route path="/hd-image" element={<ImageGeneration />} />
          <Route path="/gen-fill" element={<GenFill />} />
          <Route path="/erase-element" element={<EraseElement />} />
          <Route path="/gen-bg" element={<GenBackground />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
