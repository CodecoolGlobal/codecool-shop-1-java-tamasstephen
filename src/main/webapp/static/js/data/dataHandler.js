const dataHandler = {
    async getProducts(product) {
        const response = await fetch(`/api/products?list=${product}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(product)
        });
        const data =  await response.json();
        return(data);
    }
}

export { dataHandler };