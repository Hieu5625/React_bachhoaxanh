import React, { useEffect, useState } from "react";
import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../services/CustomerService";

function CustomerTable() {
  const [customers, setCustomers] = useState([]); // Danh sách khách hàng
  const [isAdding, setIsAdding] = useState(false); // Kiểm soát hiển thị form thêm khách hàng
  const [editingCustomerId, setEditingCustomerId] = useState(null); // Lưu trạng thái khách hàng đang được chỉnh sửa
  const [newCustomer, setNewCustomer] = useState({
    MA_KH: "",
    HOTEN_KH: "",
    SDT_KH: "",
    EMAIL_KH: "",
  });
  const [editedCustomer, setEditedCustomer] = useState({}); // Lưu thông tin khách hàng đang chỉnh sửa

  // Lấy danh sách khách hàng từ API khi component được mount
  useEffect(() => {
    async function fetchCustomers() {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khách hàng:", error);
      }
    }
    fetchCustomers();
  }, []);

  // Hiển thị form thêm khách hàng
  const handleAddClick = () => {
    setIsAdding(true);
  };

  // Ẩn form thêm khách hàng
  const handleCancelAddClick = () => {
    setNewCustomer({
      MA_KH: "",
      HOTEN_KH: "",
      SDT_KH: "",
      EMAIL_KH: "",
    }); // Đặt lại form
    setIsAdding(false); // Ẩn form
  };

  // Xử lý thay đổi trong ô input khi thêm khách hàng
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý thay đổi trong ô chỉnh sửa khi chỉnh sửa khách hàng
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer((prev) => ({ ...prev, [name]: value }));
  };

  // Lưu khách hàng mới và cập nhật danh sách
  const handleSaveClick = async () => {
    try {
      const addedCustomer = await addCustomer(newCustomer);
      setCustomers([...customers, addedCustomer]); // Thêm khách hàng vào danh sách
      setNewCustomer({
        MA_KH: "",
        HOTEN_KH: "",
        SDT_KH: "",
        EMAIL_KH: "",
      }); // Reset form
      setIsAdding(false); // Ẩn form
      alert("Khách hàng đã được thêm thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm khách hàng:", error);
      alert("Không thể thêm khách hàng!");
    }
  };

  // Bắt đầu chỉnh sửa khách hàng
  const handleEditClick = (customer) => {
    setEditingCustomerId(customer.MA_KH);
    setEditedCustomer(customer);
  };

  // Lưu thay đổi sau khi chỉnh sửa khách hàng
  const handleSaveEditClick = async () => {
    try {
      await updateCustomer(editingCustomerId, editedCustomer);
      setCustomers(
        customers.map((customer) =>
          customer.MA_KH === editingCustomerId ? editedCustomer : customer
        )
      );
      setEditingCustomerId(null); // Thoát chế độ chỉnh sửa
      alert("Cập nhật khách hàng thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật khách hàng:", error);
      alert("Không thể cập nhật khách hàng!");
    }
  };

  // Xóa khách hàng
  const handleDeleteClick = async (MA_KH) => {
    try {
      const result = await deleteCustomer(MA_KH);
      if (result && result.message === "Xóa khách hàng thành công!") {
        setCustomers(customers.filter((customer) => customer.MA_KH !== MA_KH));
        alert(result.message);
      }
    } catch (error) {
      console.error("Lỗi khi xóa khách hàng:", error);
      alert("Không thể xóa khách hàng!");
    }
  };

  return (
    <div>
      <h3>Danh Sách Khách Hàng</h3>
      <button onClick={handleAddClick} className="add-customer-button">
        Thêm Khách Hàng
      </button>
      <table>
        <thead>
          <tr>
            <th>Mã Khách</th>
            <th>Họ Tên Khách</th>
            <th>Số Điện Thoại</th>
            <th>Email</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {/* Hiển thị form thêm khách hàng nếu isAdding là true */}
          {isAdding && (
            <tr>
              <td>
                <input
                  type="text"
                  name="MA_KH"
                  value={newCustomer.MA_KH}
                  onChange={handleInputChange}
                  placeholder="Mã Khách"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="HOTEN_KH"
                  value={newCustomer.HOTEN_KH}
                  onChange={handleInputChange}
                  placeholder="Họ Tên"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="SDT_KH"
                  value={newCustomer.SDT_KH}
                  onChange={handleInputChange}
                  placeholder="Số Điện Thoại"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="EMAIL_KH"
                  value={newCustomer.EMAIL_KH}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
              </td>
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

          {/* Hiển thị danh sách khách hàng */}
          {customers.map((customer) =>
            editingCustomerId === customer.MA_KH ? (
              <tr key={customer.MA_KH}>
                <td>{customer.MA_KH}</td>
                <td>
                  <input
                    type="text"
                    name="HOTEN_KH"
                    value={editedCustomer.HOTEN_KH}
                    onChange={handleEditInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="SDT_KH"
                    value={editedCustomer.SDT_KH}
                    onChange={handleEditInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="EMAIL_KH"
                    value={editedCustomer.EMAIL_KH}
                    onChange={handleEditInputChange}
                  />
                </td>
                <td>
                  <button onClick={handleSaveEditClick} className="save-button">
                    Lưu
                  </button>
                  <button
                    onClick={() => setEditingCustomerId(null)}
                    className="cancel-button"
                  >
                    Hủy
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={customer.MA_KH}>
                <td>{customer.MA_KH}</td>
                <td>{customer.HOTEN_KH}</td>
                <td>{customer.SDT_KH}</td>
                <td>{customer.EMAIL_KH}</td>
                <td>
                  <button onClick={() => handleEditClick(customer)}>Sửa</button>
                  <button onClick={() => handleDeleteClick(customer.MA_KH)}>
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

export default CustomerTable;
