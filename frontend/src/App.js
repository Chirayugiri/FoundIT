import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './Home';
import AllProducts from './pages/AllProducts';
import Register from './pages/Register';
import Login from './pages/Login';
import UserDetails from './pages/UserDetails';
import ProductDetail from './pages/ProductDetail';
import FoundReport from './pages/FoundReport';
import LostReport from './pages/LostReport';
import CategoryProduct from './pages/CategoryProduct';
import MyLostReports from './pages/MyLostReports';
import Main from './pages/admin/Main';
import MyClaimRequests from './pages/MyClaimRequests';
import ProtectedRoutes from './utils/ProtectedRoutes';

function App() {
  const user = localStorage.getItem("email")
  console.log("user: ", user);
  return (
    <div className="App">
      <Routes>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userdetails" element={<UserDetails />} />

        {/* protected routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/categoryproduct" element={<CategoryProduct />} />
          <Route path="/productDetail" element={<ProductDetail />} />
          <Route path="/foundReport" element={<FoundReport />} />
          <Route path="/lostReport" element={<LostReport />} />
          <Route path="/mylostreports" element={<MyLostReports />} />
          <Route path="/myclaimrequest" element={<MyClaimRequests />} />
          <Route path="/admin" element={<Main />} /></Route>
      </Routes>
    </div>
  );
}

export default App;
