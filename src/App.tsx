import { Routes, Route, Navigate } from "react-router-dom";
import List from "./pages/List";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="checkout" element={<Checkout />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/" element={<List />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
