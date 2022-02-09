const dataHandler = {

    async upDateOrder(product) {
        return await this.apiPost(`/api/update`, product);
    },

    async addOneMoreItemToCart(product){
        return await this.apiPost(`/api/add`, product);
    },

    async getCartContent(){
        return await this.apiGet("/api/getCart");
    },

    async getProductCount(){
        return await this.apiGet("/api/getProductCount");
    },

    async getProductsByCategory(categoryId){
      return await this.apiGet(`/api/category?categoryId=${categoryId}`);
    },

    async getProductBySupplier(supplierId){
        return await this.apiGet(`/api/supplier?supplierId=${supplierId}`)
    },
    async getAllProduct(){
        return await this.apiGet('/api/all-product')
    },

    async apiPost(url, payload){
        const response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        })
        return await response.json();
    },

    async apiGet(url){
        const response = await fetch(url);
        return await response.json();
    }
}

export { dataHandler };