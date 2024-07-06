
import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    // function handleChange({ target }) {
    //     let { value, name: field, type } = target
    //     value = type === 'number' ? +value : value
    //     setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    // }
    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked ? -1 : 1
                break

            default:
                break;
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value}))
    }

    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form >
                <label htmlFor="txt">Name:</label>
                <input type="text"
                    id="txt"
                    name="txt"
                    placeholder="By txt"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    value={filterByToEdit.maxPrice || ''}
                    onChange={handleChange}
                />
                <div className="radio-sort flex justify-center align-center">
                    <label htmlFor="all">
                        <input defaultChecked type="radio" name="inStock" value="all" id="all" onChange={handleChange} />
                        All
                    </label>
                    <label htmlFor="inStock">
                        <input type="radio" name="inStock" value="inStock" id="inStock" onChange={handleChange} />
                        In stock
                    </label>
                    <label htmlFor="outOfStock">
                        <input type="radio" name="inStock" value="outOfStock" id="outOfStock" onChange={handleChange} />
                        Out of stock
                    </label>
                </div>
                <div>
                    <label htmlFor="sortBy">Sort by:</label>
                    <select name="sortBy" value={filterByToEdit.sortBy} onChange={handleChange}>
                        <option value="">Select Sorting</option>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                        <option value="createdAt">Created At</option>
                    </select>

                    <label htmlFor="sortDir">Sort descending:</label>
                    <input
                        type="checkbox"
                        name="sortDir"
                        id="sortDir"
                        checked={filterByToEdit.sortDir === -1}
                        onChange={handleChange}
                    />
                </div>

            </form>

        </section>
    )
}