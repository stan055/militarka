class Login {

    user=null

    constructor() {
        this.user = this.getUser()
    }

    signIn(user) {
        this.user = user
        this.save()
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

    static getUser() {
        const json = localStorage.getItem('LOGIN')
        if (json != null)
            return JSON.parse(json)
        else 
            return {
                "name": null,
                "pass": null,
                "type": 'guest'
            }
    }
}

export default Login



