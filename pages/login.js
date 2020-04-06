import Head from 'next/head'
import axios from 'axios'

class Home extends React.Component {
    call_api = (e) => {
        e.preventDefault()
        axios.post('/auth/login', { username: "zemuldo", password: "password" })
            .then((data) => {
                console.log(data.data)
                window.location = '/'
            })
            .catch(err => console.log(err))
    }
    render() {
        return (<div>
            <form>
                <p>Login Here</p>
                <input />
                <input />
                <button onClick={this.call_api}>Login</button>
            </form>
        </div>)
    }
}

export default Home
