import { useState, useEffect } from "react"
import { FaUser, FaUserTie } from "react-icons/fa"
import {RiAdminFill} from 'react-icons/ri'
import { useSelector, useDispatch } from "react-redux"
import {getUserById, updateUser, reset} from '../features/users/usersListSlice'
import {useNavigate, useParams} from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { toast } from "react-toastify"

function EditUserScreen() {
    const {editUser, isLoading, editSuccess} = useSelector(state => state.userList)
    const [isAdmin, setIsAdmin] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(editSuccess){
            dispatch(reset())
            navigate('/admin/users')
            toast.success('User Updated')
        }

        dispatch(getUserById(params.id))
    }, [dispatch, params.id, editSuccess, navigate])

    useEffect(() => {
        setName(editUser.name)
        setEmail(editUser.email)
        setIsAdmin(editUser.isAdmin)
    }, [editUser])

    const updateDetails = () => {
        const userData = {
            name,
            email,
            isAdmin
        }

        dispatch(updateUser({userId: params.id, userData}))
    }

  return (
    <div className="mx-4 my-6 lg:my-0 lg:mx-12">
         <h1 className="font-semibold text-3xl text-center text-black my-4">USER PROFILE</h1>
         <BackButton url='/admin/users'/>
         {isLoading ? <Spinner /> : 
         <div className="flex flex-col mx-4 my-4 lg:items-center lg:mx-0">
         <div className="form-control lg:w-1/4">
             <label className="label">
             <span className="label-text flex items-center font-semibold"><FaUser /><p className='mx-1'>Name</p></span>
             </label>
             <input type="text" placeholder="Name" id='name' className="input input-bordered" onChange={(e) => setName(e.target.value)} value={name}/>
         </div>
         <div className="form-control lg:w-1/4">
             <label className="label">
             <span className="label-text flex items-center font-semibold"><FaUserTie /><p className='mx-1'>Email</p></span>
             </label>
             <input type="email" placeholder="Email" id='email' className= "input input-bordered" onChange={(e) => setEmail(e.target.value)} value={email}/>
         </div>
         <div className="form-control lg:w-1/4">
             <label className="label">
             <span className="label-text flex items-center font-semibold"><RiAdminFill /><p className='mx-1'>Admin</p></span>
             </label>
             <input type="checkbox" id="isAdmin" className="toggle toggle-lg" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
         </div>
         <div className="flex-row justify-between form-control mt-6">
            <button className="btn btn-ghost text-black bg-base-200" onClick={updateDetails}>Update Details</button>
        </div>
     </div>
         }
    </div>
  )
}

export default EditUserScreen