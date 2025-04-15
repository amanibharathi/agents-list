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
import { QueryClient, QueryClientProvider } from 'react-query';
import AdminLoginPage from "./login/adminlogin/page";
import AgentsList from "./pages/Auth/AgentComponents/AgentsList";
import { AdminListFilterProvider } from "./pages/Auth/AgentComponents/admincompenets/AdminListFilterProvider";

function App() {
  // Create a new QueryClient instance
  const queryClient = new QueryClient();
  
  const isAuthenticated = () => {
    const token = getUserToken();
    return Boolean(token);
  };

  // Protected route wrapper component
  const ProtectedRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" replace />,
    },
    {
      element: <AuthUILayout />,
      children: [
        {
          path: "/login",
          element: <AdminLoginPage />
        },
        // Other auth routes...
      ],
    },
    // Protected routes
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [

        {
          path: "agents-list",
          element: (
            <AdminListFilterProvider>
              <AgentsList />
            </AdminListFilterProvider>
          )
        }
      ]
    }
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