const dataHandler = {

    async upDateOrder(product) {
        return await this.apiPost(`/api/update`, product);
    },

    async addOneMoreItemToCart(product){
        return await this.apiPost(`/api/add`, product);
    },

    async getCartContent(){
        const response = await fetch("/api/getCart");
        return await response.json();
    },

    async apiPost(url, payload){
        const response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        })
        return await response.json();
    }
}

export { dataHandler };