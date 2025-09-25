import { Route, Routes } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import ImageGeneration from "./pages/ImageGeneration";
import EraseElement from "./pages/EraseElement";
import GenFill from "./pages/GenFill";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReplaceBackground from "./pages/ReplaceBackground";
import Hero from "./pages/Hero";
import NavBar from "./components/NavBar";
import PlaygroundInfo from "./pages/PlaygroundInfo";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          path="/"
          element={
            <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
              <NavBar />
              <Hero />
            </div>
          }
        />

        <Route path="/playground" element={<MainLayout />}>
          <Route index element={<PlaygroundInfo />} />
          <Route path="hd-image" element={<ImageGeneration />} />
          <Route path="gen-fill" element={<GenFill />} />
          <Route path="erase-element" element={<EraseElement />} />
          <Route path="replace-bg" element={<ReplaceBackground />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
