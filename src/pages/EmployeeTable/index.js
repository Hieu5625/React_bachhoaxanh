import React, { useEffect, useState } from "react";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../services/EmployeeService";

function EmployeeTable() {
  const [employees, setEmployees] = useState([]); // Danh sách nhân viên
  const [isAdding, setIsAdding] = useState(false); // Hiển thị form thêm nhân viên
  const [editingEmployeeId, setEditingEmployeeId] = useState(null); // Mã nhân viên đang chỉnh sửa
  const [searchKeyword, setSearchKeyword] = useState(""); // Từ khóa tìm kiếm
  const [newEmployee, setNewEmployee] = useState({
    MA_NV: "",
    HOTEN_NV: "",
    NGAYSINH: "",
    DIACHI_NV: "",
    CHUCVU_NV: "",
    SDT_NV: "",
    EMAIL_NV: "",
  });
  const [editedEmployee, setEditedEmployee] = useState({}); // Thông tin nhân viên đang chỉnh sửa

  // Lấy danh sách nhân viên từ API
  useEffect(() => {
    async function fetchEmployees() {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách nhân viên:", error);
      }
    }
    fetchEmployees();
  }, []);

  // Xử lý tìm kiếm
  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value.toLowerCase());
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.HOTEN_NV?.toLowerCase().includes(searchKeyword) ||
      employee.MA_NV?.toLowerCase().includes(searchKeyword)
  );

  // Hiển thị form thêm nhân viên
  const handleAddClick = () => {
    setIsAdding(true);
    setEditingEmployeeId(null);
  };

  // Ẩn form thêm nhân viên
  const handleCancelAddClick = () => {
    setNewEmployee({
      MA_NV: "",
      HOTEN_NV: "",
      NGAYSINH: "",
      DIACHI_NV: "",
      CHUCVU_NV: "",
      SDT_NV: "",
      EMAIL_NV: "",
    });
    setIsAdding(false);
  };

  // Xử lý thay đổi trong form thêm
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý thay đổi trong form chỉnh sửa
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prev) => ({ ...prev, [name]: value }));
  };

  // Lưu nhân viên mới
  const handleSaveClick = async () => {
    try {
      const addedEmployee = await addEmployee(newEmployee);
      setEmployees([...employees, addedEmployee]); // Thêm nhân viên vào danh sách
      handleCancelAddClick();
      alert("Nhân viên đã được thêm thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm nhân viên:", error);
      alert("Không thể thêm nhân viên!");
    }
  };

  // Bắt đầu chỉnh sửa nhân viên
  const handleEditClick = (employee) => {
    setEditingEmployeeId(employee.MA_NV);
    setEditedEmployee(employee);
    setIsAdding(false); // Đảm bảo không hiển thị form thêm
  };

  // Lưu thay đổi sau khi chỉnh sửa
  const handleSaveEditClick = async () => {
    try {
      await updateEmployee(editingEmployeeId, editedEmployee);
      setEmployees(
        employees.map((employee) =>
          employee.MA_NV === editingEmployeeId ? editedEmployee : employee
        )
      );
      setEditingEmployeeId(null); // Thoát chế độ chỉnh sửa
      alert("Cập nhật nhân viên thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật nhân viên:", error);
      alert("Không thể cập nhật nhân viên!");
    }
  };

  // Xóa nhân viên
  const handleDeleteClick = async (MA_NV) => {
    try {
      await deleteEmployee(MA_NV);
      setEmployees(employees.filter((employee) => employee.MA_NV !== MA_NV));
      alert("Nhân viên đã được xóa thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa nhân viên:", error);
      alert("Không thể xóa nhân viên!");
    }
  };

  return (
    <div>
      <h3>Danh Sách Nhân Viên</h3>
      <div>
        <button onClick={handleAddClick} className="add-employee-button">
          Thêm Nhân Viên
        </button>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchKeyword}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Mã NV</th>
            <th>Họ Tên</th>
            <th>Ngày Sinh</th>
            <th>Địa Chỉ</th>
            <th>Chức Vụ</th>
            <th>SĐT</th>
            <th>Email</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {isAdding && (
            <tr>
              {Object.keys(newEmployee).map((key) => (
                <td key={key}>
                  <input
                    type={key === "NGAYSINH" ? "date" : "text"}
                    name={key}
                    value={newEmployee[key]}
                    onChange={handleInputChange}
                  />
                </td>
              ))}
              <td>
                <button onClick={handleSaveClick} className="save-button">
                  Lưu
                </button>
                <button
                  onClick={handleCancelAddClick}
                  className="cancel-button"
                >
                  Hủy
                </button>
              </td>
            </tr>
          )}
          {filteredEmployees.map((employee) =>
            editingEmployeeId === employee.MA_NV ? (
              <tr key={employee.MA_NV}>
                {Object.keys(editedEmployee).map((key) => (
                  <td key={key}>
                    <input
                      type={key === "NGAYSINH" ? "date" : "text"}
                      name={key}
                      value={editedEmployee[key]}
                      onChange={handleEditInputChange}
                      disabled={key === "MA_NV"}
                    />
                  </td>
                ))}
                <td>
                  <button onClick={handleSaveEditClick} className="save-button">
                    Lưu
                  </button>
                  <button
                    onClick={() => setEditingEmployeeId(null)}
                    className="cancel-button"
                  >
                    Hủy
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={employee.MA_NV}>
                <td>{employee.MA_NV}</td>
                <td>{employee.HOTEN_NV}</td>
                <td>{employee.NGAYSINH}</td>
                <td>{employee.DIACHI_NV}</td>
                <td>{employee.CHUCVU_NV}</td>
                <td>{employee.SDT_NV}</td>
                <td>{employee.EMAIL_NV}</td>
                <td>
                  <button onClick={() => handleEditClick(employee)}>Sửa</button>
                  <button onClick={() => handleDeleteClick(employee.MA_NV)}>
                    Xóa
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
