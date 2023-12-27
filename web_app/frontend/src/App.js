import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/ProductScreen"
import CartScreen from "./screens/CartScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import UserListScreen from './screens/UserListScreen'
import EditUserScreen from './screens/EditUserScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import Subscription from './screens/Subscription';
import NotFound from './screens/NotFound'

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="min-h-screen bg-base-100 mx-auto">
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/search/:keyword' element={<HomeScreen />} />
            <Route path='/page/:pageNumber' element={<HomeScreen />} />
            <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/subscription' element={<Subscription />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/profile' element={<PrivateRoute />}>
              <Route path='/profile' element={<ProfileScreen />} />
            </Route>
            <Route path='/shipping' element={<PrivateRoute />}>
              <Route path='/shipping' element={<ShippingScreen />} />
            </Route>
            <Route path='/payment' element={<PrivateRoute />}>
              <Route path='/payment' element={<PaymentMethodScreen />} />
            </Route>
            <Route path='/placeorder' element={<PrivateRoute />}>
              <Route path='/placeorder' element={<PlaceOrderScreen />} />
            </Route>
            <Route path='/orders/:id' element={<PrivateRoute />}>
              <Route path='/orders/:id' element={<OrderScreen />} />
            </Route>
            <Route path='/admin/users' element={<AdminRoute />}>
              <Route path='/admin/users' element={<UserListScreen />} />
            </Route>
            <Route path='/admin/users/:id/edit' element={<AdminRoute />}>
              <Route path='/admin/users/:id/edit' element={<EditUserScreen />} />
            </Route>
            <Route path='/admin/products' element={<AdminRoute />}>
              <Route path='/admin/products' element={<ProductListScreen />} />
            </Route>
            <Route path='/admin/products/:pageNumber' element={<AdminRoute />}>
              <Route path='/admin/products/:pageNumber' element={<ProductListScreen />} />
            </Route>
            <Route path='/admin/products/:id/edit' element={<AdminRoute />}>
              <Route path='/admin/products/:id/edit' element={<ProductEditScreen />} />
            </Route>
            <Route path='/admin/orders' element={<AdminRoute />}>
              <Route path='/admin/orders' element={<OrderListScreen />} />
            </Route>
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App;
