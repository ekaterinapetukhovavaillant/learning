import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexView from "./view/IndexView";
import RegistrationView from "./view/RegistrationView";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<IndexView />} />
          <Route path="/registration" element={<RegistrationView />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
