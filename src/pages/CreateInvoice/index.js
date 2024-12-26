import React, { useEffect, useState } from "react";
import { getProducts } from "../../services/ProductService";
import { getCustomers } from "../../services/CustomerService";
import { getEmployees } from "../../services/EmployeeService";
import { addInvoice, addInvoiceDetail } from "../../services/InvoiceService";

function CreateInvoice() {
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [products, setProducts] = useState([]);
  const [invoice, setInvoice] = useState({
    MA_HD: "",
    MA_KH: "kh001", // Mặc định là khách hàng
    MA_NV: "",
    NGAYLAPHOADON: "",
    DATHANHTOAN: false,
    details: [],
  });
  const [detail, setDetail] = useState({
    MAVACH: "",
    SOLUONGBAN: 0,
    GIAMGIA: 0,
    THANHTIEN: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const customerData = await getCustomers();
        const employeeData = await getEmployees();
        const productData = await getProducts();
        setCustomers(customerData);
        setEmployees(employeeData);
        setProducts(productData);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    }
    fetchData();
  }, []);

  const handleAddDetail = () => {
    const selectedProduct = products.find(
      (product) => product.MAVACH === detail.MAVACH
    );
    const calculatedTotal =
      detail.SOLUONGBAN *
      (selectedProduct.DONGIA -
        (selectedProduct.DONGIA * detail.GIAMGIA) / 100);

    setInvoice((prev) => ({
      ...prev,
      details: [...prev.details, { ...detail, THANHTIEN: calculatedTotal }],
    }));

    setDetail({ MAVACH: "", SOLUONGBAN: 0, GIAMGIA: 0, THANHTIEN: 0 });
  };

  const handleSubmit = async () => {
    try {
      // Thêm hóa đơn chính
      await addInvoice(invoice);

      // Thêm từng chi tiết hóa đơn
      for (const d of invoice.details) {
        await addInvoiceDetail({
          MA_HD: invoice.MA_HD,
          ...d,
        });
      }
      alert("Hóa đơn đã được thêm thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm hóa đơn:", error);
      alert("Không thể thêm hóa đơn!");
    }
  };

  return (
    <div>
      <h2>Thêm Hóa Đơn</h2>
      <form>
        <label>Mã Hóa Đơn:</label>
        <input
          type="text"
          value={invoice.MA_HD}
          onChange={(e) => setInvoice({ ...invoice, MA_HD: e.target.value })}
        />
        <label>Khách Hàng:</label>
        <select
          value={invoice.MA_KH}
          onChange={(e) => setInvoice({ ...invoice, MA_KH: e.target.value })}
        >
          <option value="kh001">Khách Hàng Mặc Định</option>
          {customers.map((customer) => (
            <option key={customer.MA_KH} value={customer.MA_KH}>
              {customer.HOTEN_KH}
            </option>
          ))}
        </select>
        <label>Nhân Viên:</label>
        <select
          value={invoice.MA_NV}
          onChange={(e) => setInvoice({ ...invoice, MA_NV: e.target.value })}
        >
          <option value="">Chọn Nhân Viên</option>
          {employees.map((employee) => (
            <option key={employee.MA_NV} value={employee.MA_NV}>
              {employee.HOTEN_NV}
            </option>
          ))}
        </select>
        <label>Ngày Lập Hóa Đơn:</label>
        <input
          type="date"
          value={invoice.NGAYLAPHOADON}
          onChange={(e) =>
            setInvoice({ ...invoice, NGAYLAPHOADON: e.target.value })
          }
        />
        <label>Đã Thanh Toán:</label>
        <input
          type="checkbox"
          checked={invoice.DATHANHTOAN}
          onChange={(e) =>
            setInvoice({ ...invoice, DATHANHTOAN: e.target.checked })
          }
        />

        <h3>Chi Tiết Hóa Đơn</h3>
        <label>Sản Phẩm:</label>
        <select
          value={detail.MAVACH}
          onChange={(e) => setDetail({ ...detail, MAVACH: e.target.value })}
        >
          <option value="">Chọn Sản Phẩm</option>
          {products.map((product) => (
            <option key={product.MAVACH} value={product.MAVACH}>
              {product.TENHANG}
            </option>
          ))}
        </select>
        <label>Số Lượng:</label>
        <input
          type="number"
          value={detail.SOLUONGBAN}
          onChange={(e) =>
            setDetail({ ...detail, SOLUONGBAN: parseInt(e.target.value, 10) })
          }
        />
        <label>Giảm Giá (%):</label>
        <input
          type="number"
          value={detail.GIAMGIA}
          onChange={(e) =>
            setDetail({ ...detail, GIAMGIA: parseFloat(e.target.value) })
          }
        />
        <button type="button" onClick={handleAddDetail}>
          Thêm Chi Tiết
        </button>
      </form>

      <h3>Danh Sách Chi Tiết</h3>
      <table>
        <thead>
          <tr>
            <th>Sản Phẩm</th>
            <th>Số Lượng</th>
            <th>Giảm Giá</th>
            <th>Thành Tiền</th>
          </tr>
        </thead>
        <tbody>
          {invoice.details.map((d, index) => (
            <tr key={index}>
              <td>
                {
                  products.find((product) => product.MAVACH === d.MAVACH)
                    ?.TENHANG
                }
              </td>
              <td>{d.SOLUONGBAN}</td>
              <td>{d.GIAMGIA}%</td>
              <td>{d.THANHTIEN.toLocaleString()} VND</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button type="button" onClick={handleSubmit}>
        Lưu Hóa Đơn
      </button>
    </div>
  );
}

export default CreateInvoice;
