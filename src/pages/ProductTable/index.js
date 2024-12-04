import React, { useEffect, useState } from "react";
import { getProducts, addProduct } from "../../services/productService";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [isAdding, setIsAdding] = useState(false); // Kiểm soát hiển thị form thêm sản phẩm
  const [newProduct, setNewProduct] = useState({
    MAVACH: "",
    TENHANG: "",
    DANHMUCHANG: "",
    SOLUONGHIENCO: "",
    MOTAHANG: "",
  });

  // Lấy danh sách sản phẩm từ API khi component được mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      }
    }
    fetchProducts();
  }, []);

  // Hiển thị form thêm sản phẩm
  const handleAddClick = () => {
    setIsAdding(true);
  };

  // Xử lý thay đổi trong ô input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Lưu sản phẩm mới và cập nhật danh sách
  const handleSaveClick = async () => {
    try {
      const addedProduct = await addProduct(newProduct);
      setProducts([...products, addedProduct]); // Thêm sản phẩm vào danh sách
      setNewProduct({
        MAVACH: "",
        TENHANG: "",
        DANHMUCHANG: "",
        SOLUONGHIENCO: "",
        MOTAHANG: "",
      }); // Reset form
      setIsAdding(false); // Ẩn form
      alert("Sản phẩm đã được thêm thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      alert("Không thể thêm sản phẩm!");
    }
  };

  return (
    <div>
      <h3>Danh Sách Sản Phẩm</h3>
      <button onClick={handleAddClick} className="add-product-button">
        Thêm Sản Phẩm
      </button>
      <table>
        <thead>
          <tr>
            <th>Mã Sản Phẩm</th>
            <th>Tên Sản Phẩm</th>
            <th>Danh Mục</th>
            <th>Số Lượng</th>
            <th>Mô Tả</th>
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
                  name="DANHMUCHANG"
                  value={newProduct.DANHMUCHANG}
                  onChange={handleInputChange}
                  placeholder="Danh mục"
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
                  name="MOTAHANG"
                  value={newProduct.MOTAHANG}
                  onChange={handleInputChange}
                  placeholder="Mô tả"
                />
              </td>
              <td>
                <button onClick={handleSaveClick} className="save-button">
                  Lưu
                </button>
              </td>
            </tr>
          )}

          {/* Hiển thị danh sách sản phẩm */}
          {products.map((product) => (
            <tr key={product.MAVACH}>
              <td>
                <p>{product.MAVACH}</p>
              </td>
              <td>
                <p>{product.TENHANG}</p>
              </td>
              <td>
                <p>{product.DANHMUCHANG}</p>
              </td>
              <td>
                <p>{product.SOLUONGHIENCO}</p>
              </td>
              <td>
                <p>{product.MOTAHANG}</p>
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

export default ProductTable;
