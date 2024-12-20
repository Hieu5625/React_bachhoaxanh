import React, { useEffect, useState } from "react";
import { getEmployees } from "../../services/EmployeeService";
import { getProducts } from "../../services/ProductService";
import { addReceipt, addReceiptDetail } from "../../services/ReceiptService";

function ReceiptForm() {
  const [employees, setEmployees] = useState([]);
  const [products, setProducts] = useState([]);
  const [receipt, setReceipt] = useState({
    SOPHIEUNHAPHANG: "",
    MA_NV: "",
    NHACUNGCAP: "",
    NGAYNHAPHANG: "",
    details: [],
  });
  const [detail, setDetail] = useState({
    MAVACH: "",
    SOLUONGNHAP: 0,
    DONGIANHAP: 0,
    CHATLUONGHANG: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const employeeData = await getEmployees();
        const productData = await getProducts();
        setEmployees(employeeData);
        setProducts(productData);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    }
    fetchData();
  }, []);

  const handleAddDetail = () => {
    setReceipt((prev) => ({
      ...prev,
      details: [
        ...prev.details,
        { ...detail, TENHANG: getProductName(detail.MAVACH) },
      ],
    }));
    setDetail({ MAVACH: "", SOLUONGNHAP: 0, DONGIANHAP: 0, CHATLUONGHANG: "" });
  };

  const getProductName = (MAVACH) => {
    const product = products.find((p) => p.MAVACH === MAVACH);
    return product ? product.TENHANG : "";
  };

  const handleSubmit = async () => {
    try {
      await addReceipt(receipt);
      for (const d of receipt.details) {
        await addReceiptDetail({
          SOPHIEUNHAPHANG: receipt.SOPHIEUNHAPHANG,
          ...d,
        });
      }
      alert("Phiếu nhập hàng đã được lưu!");
    } catch (error) {
      console.error("Lỗi khi lưu phiếu nhập hàng:", error);
      alert("Không thể lưu phiếu nhập hàng!");
    }
  };

  return (
    <div>
      <h2>Lập Phiếu Nhập Hàng</h2>
      <form>
        <label>Mã Phiếu:</label>
        <input
          type="text"
          value={receipt.SOPHIEUNHAPHANG}
          onChange={(e) =>
            setReceipt({ ...receipt, SOPHIEUNHAPHANG: e.target.value })
          }
        />
        <label>Nhân Viên:</label>
        <select
          value={receipt.MA_NV}
          onChange={(e) => setReceipt({ ...receipt, MA_NV: e.target.value })}
        >
          <option value="">Chọn Nhân Viên</option>
          {employees.map((e) => (
            <option key={e.MA_NV} value={e.MA_NV}>
              {e.HOTEN_NV}
            </option>
          ))}
        </select>
        <label>Nhà Cung Cấp:</label>
        <input
          type="text"
          value={receipt.NHACUNGCAP}
          onChange={(e) =>
            setReceipt({ ...receipt, NHACUNGCAP: e.target.value })
          }
        />
        <label>Ngày Nhập Hàng:</label>
        <input
          type="date"
          value={receipt.NGAYNHAPHANG}
          onChange={(e) =>
            setReceipt({ ...receipt, NGAYNHAPHANG: e.target.value })
          }
        />
        <h3>Chi Tiết Phiếu Nhập</h3>
        <label>Sản Phẩm:</label>
        <select
          value={detail.MAVACH}
          onChange={(e) => setDetail({ ...detail, MAVACH: e.target.value })}
        >
          <option value="">Chọn Sản Phẩm</option>
          {products.map((p) => (
            <option key={p.MAVACH} value={p.MAVACH}>
              {p.TENHANG}
            </option>
          ))}
        </select>
        <label>Số Lượng:</label>
        <input
          type="number"
          value={detail.SOLUONGNHAP}
          onChange={(e) =>
            setDetail({ ...detail, SOLUONGNHAP: e.target.value })
          }
        />
        <label>Đơn Giá:</label>
        <input
          type="number"
          value={detail.DONGIANHAP}
          onChange={(e) => setDetail({ ...detail, DONGIANHAP: e.target.value })}
        />
        <label>Chất Lượng:</label>
        <input
          type="text"
          value={detail.CHATLUONGHANG}
          onChange={(e) =>
            setDetail({ ...detail, CHATLUONGHANG: e.target.value })
          }
        />
        <button type="button" onClick={handleAddDetail}>
          Thêm Chi Tiết
        </button>
      </form>

      {/* Hiển thị danh sách chi tiết phiếu nhập */}
      <h3>Danh Sách Chi Tiết</h3>
      <table>
        <thead>
          <tr>
            <th>Sản Phẩm</th>
            <th>Số Lượng</th>
            <th>Đơn Giá</th>
            <th>Chất Lượng</th>
          </tr>
        </thead>
        <tbody>
          {receipt.details.map((d, index) => (
            <tr key={index}>
              <td>{d.TENHANG}</td>
              <td>{d.SOLUONGNHAP}</td>
              <td>{d.DONGIANHAP}</td>
              <td>{d.CHATLUONGHANG}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button type="button" onClick={handleSubmit}>
        Lưu Phiếu Nhập
      </button>
    </div>
  );
}

export default ReceiptForm;
