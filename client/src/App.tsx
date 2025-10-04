import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/contexts/AuthContext";

import Navigation from "@/components/Navigation";
import LoadingOverlay from "@/components/LoadingOverlay";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Committees from "@/pages/Committees";
import Resources from "@/pages/Resources";
import Contact from "@/pages/Contact";
import ExecutiveCommittee from "@/pages/ExecutiveCommittee"
import ExecutiveBoard from "@/pages/ExecutiveBoard"
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/committees" component={Committees} />
        <Route path="/resources" component={Resources} />
        <Route path="/contact" component={Contact} />
        <Route path="/executivecommittee" component={ExecutiveCommittee} />
        <Route path="/executiveboard" component={ExecutiveBoard} />
        <Route path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground">
            <LoadingOverlay isVisible={isLoading} />
            <Navigation />
            <main className="pt-16 md:pt-14">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
