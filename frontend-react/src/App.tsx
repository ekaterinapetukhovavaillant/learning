import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexView from "./features/homepage/IndexView";
import RegistrationView from "./features/registration/RegistrationView";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginView from "./features/login/LoginView";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<IndexView />} />
          <Route path="/registration" element={<RegistrationView />} />
          <Route path="/login" element={<LoginView />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
