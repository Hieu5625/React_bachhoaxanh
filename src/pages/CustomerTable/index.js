import React, { useEffect, useState } from "react";
import { getCustomers, addCustomer } from "../../services/CustomerService";

function CustomerTable() {
  const [Customers, setCustomers] = useState([]);
  const [isAdding, setIsAdding] = useState(false); // Kiểm soát hiển thị form thêm Khách
  const [newCustomer, setNewCustomer] = useState({
    MA_KH: "",
    HO_KH: "",
    TEN_KH: "",
    SDT_KH: "",
    EMAIL_KH: "",
  });

  // Lấy danh sách Khách từ API khi component được mount
  useEffect(() => {
    async function fetchCustomers() {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách Khách:", error);
      }
    }
    fetchCustomers();
  }, []);

  // Hiển thị form thêm Khách
  const handleAddClick = () => {
    setIsAdding(true);
  };

  // Xử lý thay đổi trong ô input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
  };

  // Lưu Khách mới và cập nhật danh sách
  const handleSaveClick = async () => {
    try {
      const addedCustomer = await addCustomer(newCustomer);
      setCustomers([...Customers, addedCustomer]); // Thêm Khách vào danh sách
      setNewCustomer({
        MA_KH: "",
        HO_KH: "",
        TEN_KH: "",
        SDT_KH: "",
        EMAIL_KH: "",
      }); // Reset form
      setIsAdding(false); // Ẩn form
      alert("Khách đã được thêm thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm Khách:", error);
      alert("Không thể thêm Khách!");
    }
  };

  return (
    <div>
      <h3>Danh Sách Khách</h3>
      <button onClick={handleAddClick} className="add-Customer-button">
        Thêm Khách
      </button>
      <table>
        <thead>
          <tr>
            <th>Mã Khách</th>
            <th>Họ Khách</th>
            <th>Tên Khách</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {/* Hiển thị form thêm Khách nếu isAdding là true */}
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
                  name="HO_KH"
                  value={newCustomer.HO_KH}
                  onChange={handleInputChange}
                  placeholder="Họ Khách"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="TEN_KH"
                  value={newCustomer.TEN_KH}
                  onChange={handleInputChange}
                  placeholder="Tên Khách"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="SDT_KH"
                  value={newCustomer.SDT_KH}
                  onChange={handleInputChange}
                  placeholder="Số điện thoại"
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
              </td>
            </tr>
          )}

          {/* Hiển thị danh sách Khách */}
          {Customers.map((Customer) => (
            <tr key={Customer.MA_KH}>
              <td>
                <p>{Customer.MA_KH}</p>
              </td>
              <td>
                <p>{Customer.HO_KH}</p>
              </td>
              <td>
                <p>{Customer.TEN_KH}</p>
              </td>
              <td>
                <p>{Customer.SDT_KH}</p>
              </td>
              <td>
                <p>{Customer.EMAIL_KH}</p>
              </td>
              <td>
                <button onClick={() => {}}>Sửa</button>
                <button onClick={() => {}}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerTable;
