import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Offer } from "./pages/Offer";
import { Layout } from "./components/layout/Layout";
import { Signup } from "./pages/Signup";
import { useToken } from "./hooks/useToken";

function App() {
  const token = useToken();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}

export default App;
