import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from "./ui/AppLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import CheckIn from "./pages/CheckIn";
import ProtectRoute from "./ui/ProtectRoute";
import { DarkModeProvider } from "./context/darkModeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectRoute>
                  <AppLayout />
                </ProtectRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="account" element={<Account />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="checkIn/:bookingId" element={<CheckIn />} />

              <Route path="cabins" element={<Cabins />} />
              <Route path="sitting" element={<Settings />} />
              <Route path="users" element={<Users />} />
            </Route>
            <Route path="pageNotFound" element={<PageNotFound />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          toastOptions={{
            style: {
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
            },
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
