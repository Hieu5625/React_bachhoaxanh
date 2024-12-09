import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import LayoutDefault from "./layout/LayoutDefault";
import ProductTable from "./pages/productTable";
import CustomerTable from "./pages/CustomerTable";
import Home from "./pages/Home";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<LayoutDefault />}>
          <Route path="home" element={<Home />} />
          <Route path="products" element={<ProductTable />} />
          <Route path="customer" element={<CustomerTable />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
