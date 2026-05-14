import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ElephantQuestionProvider } from "@/contexts/ElephantQuestionContext";
import Facilitator from "./pages/Facilitator";
import FacilitatorSetup from "./pages/FacilitatorSetup";
import Participate from "./pages/Participate";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import TimePerception from "./pages/TimePerception";

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
            <Route path="/facilitator-setup" element={<FacilitatorSetup />} />
            <Route path="/participate" element={<Participate />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/time-perception" element={<TimePerception />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ElephantQuestionProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
