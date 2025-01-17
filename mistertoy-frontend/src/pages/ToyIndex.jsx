import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, saveToy, setFilterBy } from '../store/actions/toy.actions.js'

export function ToyIndex() {

    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    const labels = toys.reduce((uniqueLabels, toy) => {
        toy.labels.forEach(label => {
            if (!uniqueLabels.includes(label)) {
                uniqueLabels.push(label)
            }
        })
        return uniqueLabels
    }, [])

    // const labels = Array.from(new Set(toys.flatMap(toy => toy.labels)))
    
    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }


    return (
        <div>
            <h3>Toys App</h3>
            <main>
                <button><Link to="/toy/edit">Add Toy</Link></button>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} labels={labels} />
                {!isLoading
                    ? <ToyList toys={toys} onRemoveToy={onRemoveToy} />
                    : <div>Loading...</div>
                }
                <hr />
            </main>
        </div>
    )
}

