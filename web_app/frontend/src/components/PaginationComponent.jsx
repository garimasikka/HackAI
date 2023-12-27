import { Link } from "react-router-dom"


function PaginationComponent({pages, page, keyword='', isAdmin=false}) {
  return pages > 1 && (
    <div className="btn-group">
        {[...Array(pages).keys()].map((x) => (
            !isAdmin ? <Link key={x+1} to={keyword ? `/search/${keyword}/page/${x+1}` : `/page/${x+1}`} className={(x+1) === page ? "btn btn-md btn-active" : "btn btn-md"} >{x+1}</Link> :
            <Link key={x+1} to={`/admin/products/${x+1}`} className={(x+1) === page ? "btn btn-md btn-active" : "btn btn-md"} >{x+1}</Link>
        ))}
    </div>
  )
}

export default PaginationComponent