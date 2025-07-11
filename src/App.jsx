import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/organisms/Layout";
import ContactsPage from "@/components/pages/ContactsPage";
import CompaniesPage from "@/components/pages/CompaniesPage";
import DealsPage from "@/components/pages/DealsPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/contacts" replace />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/deals" element={<DealsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;