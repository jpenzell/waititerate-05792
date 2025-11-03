import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ElephantQuestionProvider } from "@/contexts/ElephantQuestionContext";
import Landing from "./pages/Landing";
import Facilitator from "./pages/Facilitator";
import FacilitatorControls from "./pages/FacilitatorControls";
import FacilitatorSetup from "./pages/FacilitatorSetup";
import Participate from "./pages/Participate";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ElephantQuestionProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/facilitator" element={<Facilitator />} />
            <Route path="/facilitator-controls" element={<FacilitatorControls />} />
            <Route path="/facilitator-setup" element={<FacilitatorSetup />} />
            <Route path="/participate" element={<Participate />} />
            <Route path="/auth" element={<Auth />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ElephantQuestionProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
