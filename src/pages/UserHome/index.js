// src/pages/UserHome.js
import React from "react";
import "./UserHome.css";
function UserHome() {
  // Thông tin người dùng đăng nhập (có thể thay thế bằng dữ liệu từ API)
  const userInfo = {
    maNhanVien: "NV001",
    hoTen: "Nguyễn Văn A",
    ngaySinh: "01/01/1990",
    chucVu: "Quản lý",
  };

  return (
    <div className="user-home">
      <h2>Xin chào, {userInfo.hoTen}!</h2>
      <p>Chào mừng bạn đến với hệ thống quản lý cửa hàng.</p>

      <h3>Thông tin cá nhân</h3>
      <ul>
        <li>
          <strong>Mã nhân viên:</strong> {userInfo.maNhanVien}
        </li>
        <li>
          <strong>Họ tên:</strong> {userInfo.hoTen}
        </li>
        <li>
          <strong>Ngày sinh:</strong> {userInfo.ngaySinh}
        </li>
        <li>
          <strong>Chức vụ:</strong> {userInfo.chucVu}
        </li>
      </ul>
    </div>
  );
}

export default UserHome;
