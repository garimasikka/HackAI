import { useEffect } from "react"
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import {getAllUsers, deleteUser, reset} from '../features/users/usersListSlice'
import { useSelector, useDispatch } from "react-redux" 
import {BsFillCheckCircleFill} from 'react-icons/bs'
import {BiEdit} from 'react-icons/bi'
import {ImCross} from 'react-icons/im'
import {AiFillDelete} from 'react-icons/ai'
 
function UserListScreen() {
  const dispatch = useDispatch()
  const {isLoading, isError, message, allUsers, isDeleted} = useSelector(state => state.userList)

  useEffect(() => {
    dispatch(getAllUsers())

    if(isError){
      toast.error(message)
    }
    
    if(isDeleted){
      toast.success('User Deleted') 
      dispatch(reset())
    }

  }, [dispatch, isError, message, isDeleted])

  const deleteUserHandler = (userId) => {
    dispatch(deleteUser(userId))
  }

  return (
    <div className="mb-12">
      <h1 className="font-semibold text-3xl text-center text-black my-4">USERS</h1>
      {isLoading ? <Spinner /> :
        <div className="overflow-x-auto text-black mx-4 lg:mx-12">
        <table className="table w-full text-black">
        <thead>
            <tr>
                <th>S.No</th>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {allUsers.map((user, index) => (
                <tr key={user._id} >
                    <th>{index + 1}</th>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                    <td>{user.isAdmin? <BsFillCheckCircleFill style={{color: 'green'}} /> : <ImCross style={{color: 'red'}} />}</td>
                    <td>
                    <div>
                      <Link to={`/admin/users/${user._id}/edit`} className="btn bg-base-200 btn-ghost btn-sm mr-1"><BiEdit /></Link>
                      <button onClick={() => deleteUserHandler(user._id)} className="btn btn-active text-white btn-sm ml-1"><AiFillDelete /></button>
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

export default UserListScreen