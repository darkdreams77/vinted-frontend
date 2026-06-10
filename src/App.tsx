import { Route, Routes } from "react-router-dom";

import { Layout } from "./components/layout/Layout";

import { Home } from "./pages/Home";
import { Offer } from "./pages/Offer";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Publish } from "./pages/Publish";
import { Payment } from "./pages/Payment";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/payment" element={<Payment />} />
      </Route>
    </Routes>
  );
}

export default App;
