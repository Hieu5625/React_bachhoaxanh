import React, { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  updateFromReceipt,
} from "../../services/ProductService";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [isAdding, setIsAdding] = useState(false); // Kiểm soát hiển thị form thêm sản phẩm
  const [editingProductId, setEditingProductId] = useState(null); // Lưu trạng thái sản phẩm đang được chỉnh sửa
  const [categories, setCategories] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [receiptId, setReceiptId] = useState(""); // Mã phiếu nhập để cập nhật
  const [newProduct, setNewProduct] = useState({
    MAVACH: "",
    TENHANG: "",
    MOTAHANG: "",
    SOLUONGHIENCO: "",
    DANHMUCHANG: "",
    DONGIA: "",
  });
  const [editedProduct, setEditedProduct] = useState({}); // Lưu thông tin sản phẩm đang chỉnh sửa

  // Lấy danh sách sản phẩm từ API khi component được mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts(searchKeyword);
      setProducts(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục sản phẩm:", error);
    }
  };
  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
    fetchProducts();
  };

  const handleUpdateFromReceipt = async () => {
    try {
      const result = await updateFromReceipt(receiptId);
      alert(result.message);
      fetchProducts(); // Cập nhật danh sách sản phẩm
    } catch (error) {
      console.error("Lỗi khi cập nhật từ phiếu nhập:", error);
    }
  };
  // Hiển thị form thêm sản phẩm
  const handleAddClick = () => {
    setIsAdding(true);
  };

  // Ẩn form thêm sản phẩm
  const handleCancelAddClick = () => {
    setNewProduct({
      MAVACH: "",
      TENHANG: "",
      MOTAHANG: "",
      SOLUONGHIENCO: "",
      DANHMUCHANG: "",
      DONGIA: "",
    }); // Đặt lại form
    setIsAdding(false); // Ẩn form
  };

  // Xử lý thay đổi trong ô input khi thêm sản phẩm
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý thay đổi trong ô chỉnh sửa
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Lưu sản phẩm mới và cập nhật danh sách
  const handleSaveClick = async () => {
    try {
      const addedProduct = await addProduct(newProduct);
      setProducts([...products, addedProduct]); // Thêm sản phẩm vào danh sách
      setNewProduct({
        MAVACH: "",
        TENHANG: "",
        MOTAHANG: "",
        SOLUONGHIENCO: "",
        DANHMUCHANG: "",
        DONGIA: "",
      }); // Reset form
      setIsAdding(false); // Ẩn form
      alert("Sản phẩm đã được thêm thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      alert("Không thể thêm sản phẩm!");
    }
  };

  // Bắt đầu chỉnh sửa sản phẩm
  const handleEditClick = (product) => {
    setEditingProductId(product.MAVACH);
    setEditedProduct(product);
  };

  // Lưu thay đổi sau khi chỉnh sửa
  const handleSaveEditClick = async () => {
    try {
      await updateProduct(editingProductId, editedProduct);
      setProducts(
        products.map((product) =>
          product.MAVACH === editingProductId ? editedProduct : product
        )
      );
      setEditingProductId(null); // Thoát chế độ chỉnh sửa
      alert("Cập nhật sản phẩm thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      alert("Không thể cập nhật sản phẩm!");
    }
  };

  // Xóa sản phẩm
  const handleDeleteClick = async (MAVACH) => {
    try {
      const result = await deleteProduct(MAVACH);
      if (result && result.message === "Xóa sản phẩm thành công!") {
        setProducts(products.filter((product) => product.MAVACH !== MAVACH));
        alert(result.message);
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      alert("Không thể xóa sản phẩm!");
    }
  };

  return (
    <div>
      <h3>Danh Sách Sản Phẩm</h3>
      <div>
        <button onClick={handleAddClick} className="add-product-button">
          Thêm Sản Phẩm
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Nhập mã phiếu nhập"
          value={receiptId}
          onChange={(e) => setReceiptId(e.target.value)}
        />
        <button onClick={handleUpdateFromReceipt}>
          Cập nhật từ Phiếu Nhập
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Mã Sản Phẩm</th>
            <th>Tên Sản Phẩm</th>
            <th>Mô Tả</th>
            <th>Số Lượng</th>
            <th>Danh Mục</th>
            <th>Đơn Giá</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {/* Hiển thị form thêm sản phẩm nếu isAdding là true */}
          {isAdding && (
            <tr>
              <td>
                <input
                  type="text"
                  name="MAVACH"
                  value={newProduct.MAVACH}
                  onChange={handleInputChange}
                  placeholder="Mã sản phẩm"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="TENHANG"
                  value={newProduct.TENHANG}
                  onChange={handleInputChange}
                  placeholder="Tên sản phẩm"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="MOTAHANG"
                  value={newProduct.MOTAHANG}
                  onChange={handleInputChange}
                  placeholder="Mô tả"
                />
              </td>
              <td>
                <input
                  type="number"
                  name="SOLUONGHIENCO"
                  value={newProduct.SOLUONGHIENCO}
                  onChange={handleInputChange}
                  placeholder="Số lượng"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="DANHMUCHANG"
                  value={newProduct.DANHMUCHANG}
                  onChange={handleInputChange}
                  placeholder="Danh mục"
                />
              </td>
              <td>
                <input
                  type="number"
                  name="DONGIA"
                  value={newProduct.DONGIA}
                  onChange={handleInputChange}
                  placeholder="Đơn giá"
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

          {/* Hiển thị danh sách sản phẩm */}
          {products.map((product) =>
            editingProductId === product.MAVACH ? (
              <tr key={product.MAVACH}>
                <td>{product.MAVACH}</td>
                <td>
                  <input
                    type="text"
                    name="TENHANG"
                    value={editedProduct.TENHANG}
                    onChange={handleEditInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="MOTAHANG"
                    value={editedProduct.MOTAHANG}
                    onChange={handleEditInputChange}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="SOLUONGHIENCO"
                    value={editedProduct.SOLUONGHIENCO}
                    onChange={handleEditInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="DANHMUCHANG"
                    value={editedProduct.DANHMUCHANG}
                    onChange={handleEditInputChange}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="DONGIA"
                    value={editedProduct.DONGIA}
                    onChange={handleEditInputChange}
                  />
                </td>
                <td>
                  <button onClick={handleSaveEditClick} className="save-button">
                    Lưu
                  </button>
                  <button
                    onClick={() => setEditingProductId(null)}
                    className="cancel-button"
                  >
                    Hủy
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={product.MAVACH}>
                <td>{product.MAVACH}</td>
                <td>{product.TENHANG}</td>
                <td>{product.MOTAHANG}</td>
                <td>{product.SOLUONGHIENCO}</td>
                <td>{product.DANHMUCHANG}</td>
                <td>{product.DONGIA}</td>
                <td>
                  <button onClick={() => handleEditClick(product)}>Sửa</button>
                  <button onClick={() => handleDeleteClick(product.MAVACH)}>
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

export default ProductTable;
