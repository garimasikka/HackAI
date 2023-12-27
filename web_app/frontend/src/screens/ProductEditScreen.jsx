import { useState, useEffect } from "react"
import axios from "axios"
import {useParams, useNavigate} from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import UploadLoader from '../components/UploadLoader'
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import {getProduct, updateProduct, reset} from '../features/products/productSlice'

function ProductEditScreen() {
    const {product, isError, message, isLoading, editProduct} = useSelector(state => state.products)
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        image: '',
        brand: '',
        category: '',
        countInStock: 0,
        description: '',
    })
    const [uploadingImage, setUploadingImage] = useState(false)
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const productId = params.id
    
    const {name, price, image, brand, category, countInStock, description} = formData

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if (editProduct){
            dispatch(reset())
            navigate('/admin/products')
            toast.success("Product Updated")
        }

        dispatch(getProduct(productId))
    }, [dispatch, isError, message, productId, navigate, editProduct])

    useEffect(() => {
        setFormData({
          name: product.name,
          price: product.price,
          image: product.image,
          brand: product.brand,
          category: product.category,
          countInStock: product.countInStock,
          description: product.description,
        });
      }, [product])

      const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const updateDetails = () => {
        const productData = formData
        dispatch(updateProduct({productId, productData}))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploadingImage(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const res = await axios.post('/api/upload', formData, config)
            
            setFormData((prevState) => ({
                ...prevState,
                image: res.data
            }))
            setUploadingImage(false)
        } catch (error) {
            setUploadingImage(false)
            console.log(error)
        }
    }

  return (
    <div className="mx-4 my-6 lg:my-0 lg:mx-12">
         <h1 className="font-semibold text-3xl text-center text-black my-4">EDIT PRODUCT</h1>
         <BackButton url='/admin/products'/>
         {isLoading ? <Spinner /> : 
         <div className="flex flex-col mx-4 my-4 lg:items-center lg:mx-0">
         <div className="form-control lg:w-1/3">
             <label className="label">
             <span className="label-text flex items-center font-semibold"><p className='mx-1'>Name</p></span>
             </label>
             <input type="text" placeholder="Name" id='name' className="input input-bordered" value={name} onChange={onChange} />
         </div>
         <div className="form-control lg:w-1/3">
             <label className="label">
             <span className="label-text flex items-center font-semibold"><p className='mx-1'>Price</p></span>
             </label>
             <input type="number" placeholder="Price" id='price' className= "input input-bordered" value={price} onChange={onChange} />
         </div>
         <div className="form-control lg:w-1/3">
             <label className="label">
             <span className="label-text flex items-center font-semibold"><p className='mx-1'>Image</p></span>
             </label>
             <input type="text" placeholder="Image" id='image' className="input input-bordered" value={image} onChange={onChange} />
             <input type="file" id="image-file" className="file-input file-input-bordered w-full max-w-xs my-2" onChange={uploadFileHandler} />
             {uploadingImage && <UploadLoader />}
         </div>
         <div className="form-control lg:w-1/3">
             <label className="label">
             <span className="label-text flex items-center font-semibold"><p className='mx-1'>Brand</p></span>
             </label>
             <input type="text" placeholder="Brand" id='brand' className="input input-bordered" value={brand} onChange={onChange} />
         </div>
         <div className="form-control lg:w-1/3">
             <label className="label">
             <span className="label-text flex items-center font-semibold"><p className='mx-1'>Count In Stock</p></span>
             </label>
             <input type="number" placeholder="Count In Stock" id='countInStock' className="input input-bordered" value={countInStock} onChange={onChange} />
         </div>
         <div className="form-control lg:w-1/3">
             <label className="label">
             <span className="label-text flex items-center font-semibold"><p className='mx-1'>Category</p></span>
             </label>
             <input type="text" placeholder="Category" id='category' className="input input-bordered" value={category} onChange={onChange} />
         </div>
         <div className="form-control lg:w-1/3">
             <label className="label">
             <span className="label-text flex items-center font-semibold"><p className='mx-1'>Description</p></span>
             </label>
             <input type="text" placeholder="Description" id='description' className="input input-bordered" value={description} onChange={onChange} />
         </div>
         <div className="flex-row justify-between form-control my-6">
            <button className="btn btn-ghost text-black bg-base-200" onClick={updateDetails}>Update Details</button>
        </div>
     </div>
         }
    </div>
  )
}

export default ProductEditScreen