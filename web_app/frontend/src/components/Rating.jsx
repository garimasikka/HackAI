import {FaRegStar, FaStarHalfAlt, FaStar} from 'react-icons/fa'

function Rating({value, text, color}) {
  return (
    <div className='flex items-center'>
        <div>{value >=1 ? <FaStar style={{color}} /> : value >= 0.5 ? <FaStarHalfAlt  style={{color}} /> : <FaRegStar  style={{color}} />}</div>
        <div className='ml-0.5'>{value >=2 ? <FaStar  style={{color}} /> : value >= 1.5 ? <FaStarHalfAlt  style={{color}} /> : <FaRegStar  style={{color}} />}</div>
        <div className='ml-0.5'>{value >=3 ? <FaStar  style={{color}} /> : value >= 2.5 ? <FaStarHalfAlt  style={{color}} /> : <FaRegStar  style={{color}} />}</div>
        <div className='ml-0.5'>{value >=4 ? <FaStar  style={{color}} /> : value >= 3.5 ? <FaStarHalfAlt  style={{color}} /> : <FaRegStar  style={{color}} />}</div>
        <div className='ml-0.5'>{value >=5 ? <FaStar  style={{color}} /> : value >= 4.5 ? <FaStarHalfAlt  style={{color}} /> : <FaRegStar  style={{color}} />}</div>
        <div className='mx-2'>{text && text}</div>
    </div>
    
  )
}

export default Rating