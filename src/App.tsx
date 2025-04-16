import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import AuthUILayout from "./pages/Auth/components/AuthUILayout";
import { theme } from "./lib/chakra-ui/chakra-themes";
import AppToast from "./AppComponents/AppToast";
import { getUserToken } from "./utils/functions/tokenAndUserData";
import { QueryClient, QueryClientProvider } from "react-query";
import AdminLoginPage from "./login/adminlogin/page";
import AgentsList from "./pages/agent/AgentsList";
import { AdminListFilterProvider } from "./pages/Auth/AgentComponents/admincompenets/AdminListFilterProvider";
import AppLayout from "./layout/AppLayout";
import AppliedAgents from "./pages/agent/AppliedAgents";

function App() {
  // Create a new QueryClient instance
  const queryClient = new QueryClient();

  const isAuthenticated = () => {
    const token = getUserToken();
    return Boolean(token);
  };

  // Protected route wrapper component
  const ProtectedRoute = () => {
    return isAuthenticated() ? <AppLayout /> : <Navigate to="/login" replace />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/admin/agents/agents-list" replace />,
    },
    {
      element: <AuthUILayout />,
      children: [
        {
          path: "/admin/login",
          element: <AdminLoginPage />,
        },
        // Other auth routes...
      ],
    },
    // Protected routes
    {
      path: "/admin",
      element: <ProtectedRoute />,
      children: [
        {
          path: "agents",
          element: <AdminListFilterProvider />,

          children: [
            {
              path: "agents-list",
              element: <AgentsList />,
            },
            {
              path: "applied-agents-list",
              element: <AppliedAgents />,
            },
          ],

          // path: "agents/list",
          // element: <></>,
        },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <AppToast />
          <RouterProvider router={router} />
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
