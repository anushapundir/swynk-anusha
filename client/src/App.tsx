// Import necessary modules and components for routing and state management
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/Home";
import Dashboard from "@/pages/dashboard/Home";
import Projects from "@/pages/dashboard/Projects";
import Swynk from "@/pages/dashboard/Swynk";
import { Messaging } from "@/pages/dashboard/Messaging";
import { CoffeeMeet } from "@/pages/dashboard/CoffeeMeet";

/**
 * Defines the application's routes using Wouter.
 * Maps URL paths to specific page components.
 */
function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/projects" component={Projects} />
      <Route path="/swynk" component={Swynk} />
      <Route path="/messages" component={Messaging} />
      <Route path="/coffee-meet" component={CoffeeMeet} />
      {/* Fallback route for unmatched paths */}
      <Route component={NotFound} />
    </Switch>
  );
}

/**
 * The main application component.
 * Sets up the React Query client for server state management,
 * renders the router, and includes a toaster for notifications.
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

// Export the App component as the default export
export default App;
