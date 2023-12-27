import { Link } from "react-router-dom"
import {IoMdArrowRoundBack} from 'react-icons/io'

function BackButton({url}) {
  return (
    <Link to={url} className="rounded-none btn text-white hover:scale-105"><IoMdArrowRoundBack /> Go Back</Link>
  )
}

export default BackButton