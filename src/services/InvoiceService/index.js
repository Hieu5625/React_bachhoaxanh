const API_URL = "http://localhost:5000/api/invoices";
const API_URL_DETAILS = "http://localhost:5000/api/invoice-details";
const API_invoices = "http://localhost:5000/api/invoices";

// Hàm cập nhật trạng thái thanh toán của hóa đơn
export const updateInvoiceStatus = async (MA_HD, DATHANHTOAN) => {
  try {
    const response = await fetch(`${API_invoices}/${MA_HD}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ DATHANHTOAN }),
    });
    if (!response.ok) throw new Error("Lỗi khi cập nhật trạng thái hóa đơn");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API updateInvoiceStatus:", error);
    throw error;
  }
};

// Hàm lấy danh sách hóa đơn
export const getInvoices = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Lỗi khi lấy danh sách hóa đơn");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API getInvoices:", error);
    throw error;
  }
};

// Hàm lấy chi tiết hóa đơn
export const getInvoiceDetails = async (MA_HD) => {
  try {
    const response = await fetch(`${API_URL}/${MA_HD}`);
    if (!response.ok) throw new Error("Lỗi khi lấy chi tiết hóa đơn");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API getInvoiceDetails:", error);
    throw error;
  }
};

// Hàm thêm hóa đơn
export const addInvoice = async (invoice) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invoice),
    });
    if (!response.ok) throw new Error("Lỗi khi thêm hóa đơn");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API addInvoice:", error);
    throw error;
  }
};

// Hàm thêm chi tiết hóa đơn
export const addInvoiceDetail = async (detail) => {
  try {
    const response = await fetch(API_URL_DETAILS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(detail),
    });
    if (!response.ok) throw new Error("Lỗi khi thêm chi tiết hóa đơn");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API addInvoiceDetail:", error);
    throw error;
  }
};
