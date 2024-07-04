import { Link } from "react-router-dom"

export function ToyPreview({ toy }) {
    return (
        <article>
            <h2>{toy.name}</h2>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <h4>In Stock? {toy.inStock ? 'yes' : 'no'}</h4>
            <hr />
            {/* <Link to={`/toy/edit/${toy._id}`}>Edit</Link>  */}
            <button><Link to={`/toy/${toy._id}`}>Details</Link></button>

        </article>
    )
}