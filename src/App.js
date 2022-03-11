import { useState, useEffect } from "react";
import * as BackendRequest from "./request";
import "./App.css";

function App() {
  const [productList, setProductList] = useState()
  const [newProduct, setNewProduct] = useState('')

  useEffect(() => {
    BackendRequest.getProducts(setProductList)
  }, [])

  const hangleProductChange = (e) => {
    setNewProduct(e.target.value)
  }

  const handelAddProduct = () => {
    const dataContent = { title:  newProduct }
    BackendRequest.addProduct({
      dataContent,
      productList,
      setProductList,
      setNewProduct
    })
  }

  const handleProductCount = (event, action) => {
    const dataContent = { task: action }
    const productID = event.target.parentElement.id
    BackendRequest.updateProduct(
      productID, {
        dataContent,
        productList,
        setProductList 
      }
    )
  }
  return (
    <div className="outer-element" style={{textAlign: 'center', paddingTop: '20px'}}>
      <div className="form-field">
        <input
          placeholder='Add a product...'
          value={newProduct}
          onChange={hangleProductChange}
        />
        <button onClick={handelAddProduct}>Add Product</button>
      </div>
      <div className="product-listing">
        {productList?.data?.map((product)=> (
          <li key={product.id} id={product.id}>
            {product.title}-
            <button onClick={(event)=> handleProductCount(event, 'remove')}>-</button>
            {product.count}
            <button onClick={(event)=> handleProductCount(event, 'add')}>+</button>
          </li>
        ))}
      </div>
    </div>

  );
}

export default App;
