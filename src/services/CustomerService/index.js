const API_URL = "http://localhost:5000/api/Customers";

// Hàm lấy danh sách sản phẩm
export const getCustomers = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Lỗi khi lấy danh sách sản phẩm");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API getCustomers:", error);
    throw error;
  }
};

// Hàm thêm Khách hàng mới
export const addCustomer = async (Customer) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Customer),
    });
    if (!response.ok) throw new Error("Lỗi khi thêm sản phẩm");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API addCustomer:", error);
    throw error;
  }
};

// Hàm cập nhật sản phẩm
export const updateCustomer = async (id, updatedCustomer) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCustomer),
    });
    if (!response.ok) throw new Error("Lỗi khi cập nhật sản phẩm");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API updateCustomer:", error);
    throw error;
  }
};

// Hàm xóa sản phẩm
export const deleteCustomer = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Lỗi khi xóa sản phẩm");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API deleteCustomer:", error);
    throw error;
  }
};
