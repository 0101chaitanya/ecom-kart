import {BrowserRouter, Route, Routes} from "react-router-dom";
import {lazy, Suspense} from "react";

const Navbar = lazy(() => import("./components/Navbar.jsx"));
const Products = lazy(() => import("./pages/Products.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const Features = lazy(() => import("./pages/Features.jsx"));
const ProductDetail = lazy(() => import("./pages/ProductDetail.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Users = lazy(() => import("./pages/Users.jsx"));
const UserDetail = lazy(() => import("./pages/UserDetail.jsx"));
const Carts = lazy(() => import("./pages/Carts.jsx"));
const CartDetail = lazy(() => import("./pages/CardDetail.jsx"));

function App() {

    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Navbar/>
            </Suspense>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home/>}/>
                <Route path="/features" element={<Features/>}/>

                {/* Product Routes */}
                <Route path="/products" element={<Products/>}/>
                <Route path="/products/:productId" element={<ProductDetail/>}/>

                {/* Shopping Cart Routes */}
                <Route path="/cart" element={<Cart/>}/>

                {/* Authentication */}
                <Route path="/login" element={<Login/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>

                {/* User Management Routes */}
                <Route path="/users" element={<Users/>}/>
                <Route path="/users/:userId" element={<UserDetail/>}/>

                {/* Carts Browsing Routes */}
                <Route path="/carts" element={<Carts/>}/>
                <Route path="/carts/:cartId" element={<CartDetail/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
