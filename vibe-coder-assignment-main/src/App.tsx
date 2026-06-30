import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SearchPage } from "@/components/pages/SearchPage";
import { ProfileDetailPage } from "@/components/pages/ProfileDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/profile/:username" element={<ProfileDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
