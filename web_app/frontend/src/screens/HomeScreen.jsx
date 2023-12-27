import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BsSearch } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { getAllProducts, getTopProducts, reset } from '../features/products/productSlice'
import Product from '../components/Product'
import Loader from '../components/Loader'
import PaginationComponent from '../components/PaginationComponent'
import BackButton from '../components/BackButton'
import { useNavigate, useParams } from 'react-router-dom'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'
import axios from 'axios'

function HomeScreen() {
  const { products, topProducts, isError, isLoading, message, pages, page } = useSelector(state => state.products)
  const [keyword, setKeyword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const searchWord = params.keyword || ''
  const pageNumber = params.pageNumber || 1

  useEffect(() => {
    dispatch(getAllProducts({ searchWord, pageNumber }))
    dispatch(getTopProducts())

    if (isError) {
      toast.error(message)
      dispatch(reset())
    }
  }, [dispatch, isError, message, searchWord, pageNumber])

  if (isLoading) {
    return <Loader />
  }

  const hitMl = async (word) => {
    const res = await axios.post("http://localhost:8080/api/model/get_data", word);

    console.log(res.data)
  }

  const submitHandle = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      hitMl(keyword);
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <>
      {!searchWord ?
        <Swiper
          slidesPerView={1}
          pagination={{ clickable: true }}
          style={{ height: '400px', width: '90%' }}
          loop={true}
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
        >
          {
            topProducts.map((product) => (
              <SwiperSlide key={product._id} onClick={() => navigate(`/product/${product._id}`)}>
                <div className='swiperSlideDiv mt-5' style={{ background: `url(${product.image}) center no-repeat`, backgroundSize: 'cover' }}>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper> : <div className='m-6'><BackButton url={'/'} /></div>}
      <h1 className='text-4xl text-center pt-2 text-black'>LATEST PRODUCTS</h1>
      <div className="form-control items-center mt-4">
        <form onSubmit={submitHandle}>
          <div className="relative">
            <input type="search" id="default-search" className="input input-bordered w-64 lg:w-96 text-black" placeholder="Search...." onChange={(e) => setKeyword(e.target.value)} value={keyword} />
            <button type="submit" className="text-white absolute right-2 bottom-2 btn btn-sm"><BsSearch /></button>
          </div>
        </form>
      </div>
      <div className='flex flex-wrap justify-center pt-5 mx-5'>
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <div className='w-full flex flex justify-center mt-6'>
        <PaginationComponent pages={pages} page={page} keyword={searchWord} />
      </div>
    </>
  )
}

export default HomeScreen