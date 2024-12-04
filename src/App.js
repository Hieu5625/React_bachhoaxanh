import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import LayoutDefault from "./layout/LayoutDefault";
import ProductTable from "./pages/ProductTable";
import CustomerTable from "./pages/CustomerTable";
import UserHome from "./pages/UserHome";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<LayoutDefault />}>
          <Route path="user-home" element={<UserHome />} />
          <Route path="user-products" element={<ProductTable />} />
          <Route path="user-customer" element={<CustomerTable />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
