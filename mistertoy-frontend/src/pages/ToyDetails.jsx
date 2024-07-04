import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import { toyService } from "../services/toy.service.js"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        console.log('toyId:', toyId)
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }
    if (!toy) return <div>Loading...</div>

    const formattedDate = new Date(toy.createdAt).toLocaleString('he')

    return (
        <section className="toy-details">
            <h1>Name: {toy.name}</h1>
            <h3>Price: ${toy.price}</h3>
            <h2>Created at: {formattedDate}</h2>
            <h2>In Stock? {toy.inStock ? 'yes' : 'no'}</h2>
            {/* <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button> */}
            <button><Link to={`/toy`}>Back</Link></button>
            
        </section>
    )
}