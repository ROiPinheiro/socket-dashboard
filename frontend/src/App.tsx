import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const productsSocket = io("http://localhost:3333", {
  path: "/products",
});

window.onbeforeunload = () => {
  productsSocket.disconnect();
};

interface Product {
  id: number;
  name: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  console.log("render", products);

  useEffect(() => {
    productsSocket.emit("getProducts");
    productsSocket.on("receiveProducts", (response: Product[]) => {
      setProducts(response);
    });
  }, []);

  return (
    <div>
      <h2>Products</h2>

      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
