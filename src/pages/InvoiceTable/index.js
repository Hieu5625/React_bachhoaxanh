import React, { useEffect, useState } from "react";
import {
  getEmployees,
  getCustomers,
  addInvoice,
  addInvoiceDetail,
} from "../../services/InvoiceService";

function InvoiceTable() {
  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [invoice, setInvoice] = useState({
    MA_HD: "",
    MA_KH: "",
    MA_NV: "",
    NGAYLAPHOADON: new Date().toISOString().split("T")[0],
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
        const employeeData = await getEmployees();
        const customerData = await getCustomers();
        setEmployees(employeeData);
        setCustomers(customerData);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    }
    fetchData();
  }, []);

  const handleAddDetail = () => {
    const total = detail.SOLUONGBAN * (1 - detail.GIAMGIA) * detail.THANHTIEN;
    setInvoice((prev) => ({
      ...prev,
      details: [...prev.details, { ...detail, THANHTIEN: total }],
    }));
    setDetail({ MAVACH: "", SOLUONGBAN: 0, GIAMGIA: 0, THANHTIEN: 0 });
  };

  const handleSubmit = async () => {
    try {
      await addInvoice(invoice);
      for (const d of invoice.details) {
        await addInvoiceDetail({ MA_HD: invoice.MA_HD, ...d });
      }
      alert("Hóa đơn đã được lưu!");
    } catch (error) {
      console.error("Lỗi khi lưu hóa đơn:", error);
      alert("Không thể lưu hóa đơn!");
    }
  };

  return (
    <div>
      <h2>Lập Hóa Đơn</h2>
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
          <option value="">Chọn Khách Hàng</option>
          {customers.map((c) => (
            <option key={c.MA_KH} value={c.MA_KH}>
              {c.HOTEN_KH}
            </option>
          ))}
        </select>
        <label>Nhân Viên:</label>
        <select
          value={invoice.MA_NV}
          onChange={(e) => setInvoice({ ...invoice, MA_NV: e.target.value })}
        >
          <option value="">Chọn Nhân Viên</option>
          {employees.map((e) => (
            <option key={e.MA_NV} value={e.MA_NV}>
              {e.HOTEN_NV}
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
        <label>Mã Vạch:</label>
        <input
          type="text"
          value={detail.MAVACH}
          onChange={(e) => setDetail({ ...detail, MAVACH: e.target.value })}
        />
        <label>Số Lượng:</label>
        <input
          type="number"
          value={detail.SOLUONGBAN}
          onChange={(e) => setDetail({ ...detail, SOLUONGBAN: e.target.value })}
        />
        <label>Giảm Giá (%):</label>
        <input
          type="number"
          value={detail.GIAMGIA}
          onChange={(e) => setDetail({ ...detail, GIAMGIA: e.target.value })}
        />
        <label>Thành Tiền:</label>
        <input
          type="number"
          value={detail.THANHTIEN}
          onChange={(e) => setDetail({ ...detail, THANHTIEN: e.target.value })}
        />
        <button type="button" onClick={handleAddDetail}>
          Thêm Chi Tiết
        </button>
      </form>
      <h3>Danh Sách Chi Tiết</h3>
      <table>
        <thead>
          <tr>
            <th>Mã Vạch</th>
            <th>Số Lượng</th>
            <th>Giảm Giá</th>
            <th>Thành Tiền</th>
          </tr>
        </thead>
        <tbody>
          {invoice.details.map((d, index) => (
            <tr key={index}>
              <td>{d.MAVACH}</td>
              <td>{d.SOLUONGBAN}</td>
              <td>{d.GIAMGIA}</td>
              <td>{d.THANHTIEN}</td>
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

export default InvoiceTable;
