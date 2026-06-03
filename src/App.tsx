import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Offer } from "./pages/Offer";
import { Layout } from "./components/layout/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
      </Route>
    </Routes>
  );
}

export default App;
