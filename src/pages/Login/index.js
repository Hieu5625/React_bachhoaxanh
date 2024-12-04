import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const managerAccount = {
  username: "admin",
  password: "123456",
};

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      username === managerAccount.username &&
      password === managerAccount.password
    ) {
      // Đăng nhập thành công, chuyển đến trang quản lý
      navigate("/user-home");
    } else {
      // Sai thông tin đăng nhập
      setLoginMessage("Sai tên đăng nhập hoặc mật khẩu!");
    }
  };

  return (
    <>
      <div className="login">
        <img src="/React_bachhoaxanh/bhx logo.png" alt="logo" />
        <div className="login-container">
          <header>
            <h1>Hệ Thống Quản Lý Cửa Hàng</h1>
          </header>

          <div className="login-form">
            <h2>Đăng Nhập</h2>
            <form onSubmit={handleLogin}>
              <label htmlFor="username">Tên Đăng Nhập:</label>
              <input
                type="text"
                id="username"
                placeholder="Nhập tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <label htmlFor="password">Mật Khẩu:</label>
              <input
                type="password"
                id="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit">Đăng Nhập</button>
            </form>
            {loginMessage && <p className="error-message">{loginMessage}</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
