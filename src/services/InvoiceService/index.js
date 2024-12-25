const API_URL = "http://localhost:5000/api";
const API_EMPLOYEES = `${API_URL}/employees`;
const API_CUSTOMERS = `${API_URL}/customers`;
const API_INVOICES = `${API_URL}/invoices`;
const API_INVOICE_DETAILS = `${API_URL}/invoice-details`;

// Lấy danh sách nhân viên
export const getEmployees = async () => {
  try {
    const response = await fetch(API_EMPLOYEES);
    if (!response.ok) throw new Error("Lỗi khi lấy danh sách nhân viên");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API getEmployees:", error);
    throw error;
  }
};

// Lấy danh sách khách hàng
export const getCustomers = async () => {
  try {
    const response = await fetch(API_CUSTOMERS);
    if (!response.ok) throw new Error("Lỗi khi lấy danh sách khách hàng");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API getCustomers:", error);
    throw error;
  }
};

// Thêm hóa đơn mới
export const addInvoice = async (invoice) => {
  try {
    const response = await fetch(API_INVOICES, {
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

// Thêm chi tiết hóa đơn
export const addInvoiceDetail = async (detail) => {
  try {
    const response = await fetch(API_INVOICE_DETAILS, {
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
