import React, { useEffect, useState } from "react";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../services/EmployeeService";

function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [newEmployee, setNewEmployee] = useState({
    MA_NV: "",
    HO_NV: "",
    TEN_NV: "",
    NGAYSINH: "",
    DIACHI_NV: "",
    CHUCVU_NV: "",
    SDT_NV: "",
    EMAIL_NV: "",
  });
  const [editedEmployee, setEditedEmployee] = useState({});

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

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value.toLowerCase());
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.HO_NV?.toLowerCase().includes(searchKeyword) ||
      employee.TEN_NV?.toLowerCase().includes(searchKeyword) ||
      employee.MA_NV?.toLowerCase().includes(searchKeyword)
  );

  const handleAddClick = () => {
    setIsAdding(true);
    setEditingEmployeeId(null);
  };

  const handleCancelAddClick = () => {
    setNewEmployee({
      MA_NV: "",
      HO_NV: "",
      TEN_NV: "",
      NGAYSINH: "",
      DIACHI_NV: "",
      CHUCVU_NV: "",
      SDT_NV: "",
      EMAIL_NV: "",
    });
    setIsAdding(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = async () => {
    try {
      const addedEmployee = await addEmployee(newEmployee);
      setEmployees([...employees, addedEmployee]);
      handleCancelAddClick();
      alert("Nhân viên đã được thêm thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm nhân viên:", error);
      alert("Không thể thêm nhân viên!");
    }
  };

  const handleEditClick = (employee) => {
    setEditingEmployeeId(employee.MA_NV);
    setEditedEmployee(employee);
    setIsAdding(false);
  };

  const handleSaveEditClick = async () => {
    try {
      const updatedEmployee = await updateEmployee(
        editingEmployeeId,
        editedEmployee
      );
      setEmployees(
        employees.map((employee) =>
          employee.MA_NV === editingEmployeeId ? updatedEmployee : employee
        )
      );
      setEditingEmployeeId(null);
      alert("Cập nhật nhân viên thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật nhân viên:", error);
      alert("Không thể cập nhật nhân viên!");
    }
  };

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
            <th>Họ NV</th>
            <th>Tên NV</th>
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
                <td>{employee.HO_NV}</td>
                <td>{employee.TEN_NV}</td>
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
