class Login {
    // user:
    // {
    //     "name": "",
    //     "pass": "",
    //     "type": ""
    // }
    user=null

    constructor() {
        this.user = this.getUser()
    }

    signIn(user) {
        this.user = user
        this.save()
        location.reload()
    }

    signOut() {
        this.remove()
        location.reload()
    }

    remove() {
        localStorage.removeItem('LOGIN')
        this.user = null
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
}

