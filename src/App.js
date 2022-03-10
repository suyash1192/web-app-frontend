// import logo from './logo.svg';
// import './App.css';

import { useState, useEffect } from "react";

function App() {
  const [productList, setProductList] = useState()

  useEffect(() => {
    fetch('http://localhost:3000/products/')
    .then(response => response.json())
    .then(data => setProductList(data))
    .catch(err => console.log(err))
  }, [])

  return (
    <div style={{textAlign: 'center'}}>
      Products:
      {productList?.map((product)=> (
        <li key={product.id} style={{listStyleType: 'none'}}>
          {product.title}
        </li>
      ))}
    </div>

  );
}

export default App;
