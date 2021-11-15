import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home"
import Products from "./pages/Products/Products";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


export default function App() {
  


  return (

    <Router>
      <Routes>

      <div>

        <Navbar />

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />

          <Route path="/products" element={<Products />} />

        </Routes>


        <Footer />

      </div>

      </Routes>
    </Router>
  );
}