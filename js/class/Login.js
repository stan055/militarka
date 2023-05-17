class Login {
    user=null

    constructor() {
        this.user = this.getUser()
    }

    save() {
        localStorage.setItem('LOGIN', JSON.stringify(this.user))
    }

    getUser() {
        const json = localStorage.getItem('LOGIN')
        if (json != null)
            return JSON.parse(json)
        else 
            return null
    }

    remove() {
        localStorage.removeItem('LOGIN')
        this.user = null
    }
}