const API_URL = "http://localhost:5000/api/products";
const API_CATEGORY_URL = "http://localhost:5000/api/categories";
const API_UPDATE_FROM_RECEIPT =
  "http://localhost:5000/api/products/update-from-receipt";

// Hàm cập nhật số lượng sản phẩm
export const updateProductQuantity = async (MAVACH, quantityChange) => {
  try {
    const response = await fetch(`${API_URL}/update-quantity`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ MAVACH, quantityChange }),
    });
    if (!response.ok) throw new Error("Lỗi khi cập nhật số lượng sản phẩm");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API updateProductQuantity:", error);
    throw error;
  }
};

// Lấy danh mục sản phẩm
export const getCategories = async () => {
  try {
    const response = await fetch(API_CATEGORY_URL);
    if (!response.ok) throw new Error("Lỗi khi lấy danh mục sản phẩm");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API getCategories:", error);
    throw error;
  }
};

// Cập nhật số lượng sản phẩm từ phiếu nhập
export const updateFromReceipt = async (receiptId) => {
  try {
    const response = await fetch(API_UPDATE_FROM_RECEIPT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ SOPHIEUNHAPHANG: receiptId }),
    });
    if (!response.ok)
      throw new Error("Lỗi khi cập nhật số lượng từ phiếu nhập");
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API updateFromReceipt:", error);
    throw error;
  }
};

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
