import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext, useContext } from "react";
import { User, AuthState } from "./types/user";

// Pages
import Home from "./pages/Home";
import Verify from "./pages/Verify";
import QRScan from "./pages/QRScan";
import Analysis from "./pages/Analysis";
import Results from "./pages/Results";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import InstitutionDashboard from "./pages/InstitutionDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import DemoIssuance from "./pages/DemoIssuance";
import IssuanceConfirmation from "./pages/IssuanceConfirmation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Auth Context
const AuthContext = createContext<{
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
}>({
  auth: { user: null, isAuthenticated: false },
  setAuth: () => {},
});

export const useAuth = () => useContext(AuthContext);

const App = () => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthContext.Provider value={{ auth, setAuth }}>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/qr-scan" element={<QRScan />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/results" element={<Results />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/institution" element={<InstitutionDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/demo-issuance" element={<DemoIssuance />} />
              <Route path="/issuance-confirmation" element={<IssuanceConfirmation />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
