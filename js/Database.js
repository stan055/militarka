class Database {

    // Get all data from server
    async getDatabase () {
        let data = this.getSessionStorage();
        if (data == null) {
            data = await this.getServerData();
        }
        return data;
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

}