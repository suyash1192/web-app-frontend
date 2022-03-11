
const BASE_URL = 'http://localhost:3000/'

export const getProducts = (setProductList) =>{
	fetch(`${BASE_URL}/products/`)
		.then(response => response.json())
		.then(data => setProductList({data}))
		.catch(err => console.log(err))
}

export const updateProduct = (productID, ...props) =>{
	fetch(`${BASE_URL}/products/${productID}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(props[0].dataContent)
	})
	.then( response => response.json())
	.then( data => {
		let templist = props[0].productList.data
		templist.forEach((item) => {
			if(item.id === data.id){
				item.count = data.count  
			}
		})
		props[0].setProductList({data: templist})
	})
	.catch(err => console.log(err))
}

export const addProduct = (...props) =>{
	fetch(`${BASE_URL}/products/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(props[0].dataContent)
	})
	.then(response=> response.json())
	.then( data => {
		let tempProduct = props[0].productList.data
		tempProduct.push(data)
		props[0].setProductList({data: tempProduct})
		props[0].setNewProduct('')
	})
	.catch(err => console.log(err))
}