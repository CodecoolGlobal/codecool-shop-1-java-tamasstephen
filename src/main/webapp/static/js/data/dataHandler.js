const dataHandler = {
    async upDateOrder(product) {
        const response = await fetch(`/api/update`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(product)
        });
        const data =  await response.json();
        return(data);
    }
}

export { dataHandler };