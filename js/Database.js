class Database {

    // Get all data from server
    async getDatabase () {
        this.data = this.getSessionStorage();
        if (this.data == null) {
            this.data = await this.getServerData();
        }
        return this.data;
    }

    // Save data to session storage
    saveSessionStorage (data) {
        sessionStorage.setItem("data", JSON.stringify(data));
    }

    getSessionStorage () {
        console.log('get Session Storage data')
        try {
            let json = sessionStorage.getItem("data");
            let data = JSON.parse(json);
            return data;
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    async getServerData () {
        console.log('get Server data')
        try {
            let result = await fetch('./database.json');
            let data = await result.json();
            return data;
        } catch (error) {
            console.log(error);
        }   
        return null;
    }

    // Get product dy id
    getProduct(id) {
        try {
            const product = this.data.products.find(element => element.id == id);
            return product;
        } catch (error) {
            console.log(error);
        }
    }

}