
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            // Filtering by text
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regex.test(toy.name))
            }
            // Filtering by max price
            if (filterBy.maxPrice) {
                toys = toys.filter(toy => toy.price <= filterBy.maxPrice)
            }
            // Filter by whether it is in stock
            if (filterBy.inStock && filterBy.inStock !== 'all') {
                toys = toys.filter((toy) => (filterBy.inStock === 'inStock' ? toy.inStock : !toy.inStock))
            }
            // Filtering by labels
            if (filterBy.labels && filterBy.labels.length > 0) {
                // if (filterBy.labels?.length) {
                toys = toys.filter(toy => filterBy.labels.every(label => toy.labels.includes(label)))
            }

            // Sorting
            if (filterBy.sortBy) {
                if(!filterBy.sortDir) filterBy.sortDir = 1
                if (filterBy.sortBy === 'name') {
                    toys = toys.sort((toy1, toy2) => toy1.name.localeCompare(toy2.name) * filterBy.sortDir)
                } else if (filterBy.sortBy === 'price') {
                    toys = toys.sort((toy1, toy2) => (toy1.price - toy2.price) * filterBy.sortDir)
                } else if (filterBy.sortBy === 'createdAt') {
                    toys = toys.sort((toy1, toy2) => (toy1.createdAt - toy2.createdAt) * filterBy.sortDir)
                }
            }
            return toys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        toy.createdAt = Date.now()
        return storageService.post(STORAGE_KEY, toy)
    }
}


function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
        inStock: true,
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '', labels: [] }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {name: 'Talking Doll', price: 90, inStock: false, createdAt: 1631031801011}).then(x => console.log(x))


