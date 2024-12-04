import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import "./LayoutDefault.css";

function Layout() {
  const userName = "Nguyễn Văn A";
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };
  return (
    <div className="container">
      <header>
        <h1>Quản Lý Cửa Hàng</h1>
        <div className="user-info">
          <span>
            Xin chào, <Link to="/user">{userName}</Link>
          </span>
          <button onClick={handleLogout} className="logout-button">
            Đăng Xuất
          </button>
        </div>
      </header>
      <div className="main-container">
        <nav className="sidebar">
          <ul>
            <li>
              <NavLink to="/user-home">Trang Chủ</NavLink>
            </li>
            <li>
              <NavLink to="/user-products">Sản Phẩm</NavLink>
            </li>
            <li>
              <NavLink to="/user-customer">Khách Hàng</NavLink>
            </li>
            <li>
              <NavLink to="/user3">Doanh Thu</NavLink>
            </li>
          </ul>
        </nav>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
