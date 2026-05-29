import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SalonListPage from "./pages/SalonListPage";
import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router-dom";
import SalonDetaisPage from "./pages/SalonDetailsPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/salons" />} />
          <Route path="/salons" element={<SalonListPage />} />
          <Route path="/salons/:placeId" element={<SalonDetaisPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider >
  );
}

export default App
