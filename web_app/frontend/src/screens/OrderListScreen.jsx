import { useEffect } from "react"
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import { useSelector, useDispatch } from "react-redux"
import {BiEdit} from 'react-icons/bi'
import {getAllOrders} from '../features/orders/ordersSlice'
import {GiCrossMark, GiCheckMark} from 'react-icons/gi'

function OrderListScreen() {
    const {orders, isError, message, isLoading} = useSelector(state =>state.orderList)
    const dispatch = useDispatch()

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        dispatch(getAllOrders())
    }, [dispatch, isError, message])

  return (
    <div className="mb-12">
    <h1 className="font-semibold text-3xl text-center text-black my-4">ORDERS</h1>
    {isLoading ? <Spinner /> :
      <div className="overflow-x-auto text-black mx-4 lg:mx-12">
      <table className="table w-full text-black">
      <thead>
          <tr>
              <th>S.No</th>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
          </tr>
      </thead>
      <tbody>
          {orders.map((order, index) => (
              <tr key={order._id} >
                  <th>{index + 1}</th>
                  <td>{order._id}</td>
                  <td>{order.user && <a href={`mailto:${order.user.email}`}>{order.user.email}</a>}</td>
                  <td>{new Date(order.createdAt).toLocaleString('en-IN').substring(0,8)}</td>
                  <td>&#8377; {order.totalPrice}</td>
                  <td>{order.isPaid ? <GiCheckMark /> : <GiCrossMark />}</td>
                  <td>{order.isDelivered ? <GiCheckMark /> : <GiCrossMark />}</td>
                  <td>
                  <div>
                    <Link to={`/orders/${order._id}`} className="btn bg-base-200 btn-ghost btn-sm mr-1"><BiEdit /></Link>
                  </div>
                  </td>
              </tr>
          ))}
      </tbody>
      </table>
  </div> 
    }
  </div>
  )
}

export default OrderListScreen