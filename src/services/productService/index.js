// src/services/productService.js

const API_URL = "http://localhost:5000/api/products";

// Hàm lấy danh sách sản phẩm
export const getProducts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Lỗi khi lấy danh sách sản phẩm");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API getProducts:", error);
    throw error;
  }
};

// Hàm thêm sản phẩm mới
export const addProduct = async (product) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error("Lỗi khi thêm sản phẩm");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API addProduct:", error);
    throw error;
  }
};

// Hàm cập nhật sản phẩm
export const updateProduct = async (id, updatedProduct) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });
    if (!response.ok) throw new Error("Lỗi khi cập nhật sản phẩm");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API updateProduct:", error);
    throw error;
  }
};

// Hàm xóa sản phẩm
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Lỗi khi xóa sản phẩm");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API deleteProduct:", error);
    throw error;
  }
};
