import Head from 'next/head'
import axios from 'axios'

const Home = () => (
    <div>
        <p>Login Here</p>
        <form onSubmit = {() => axios.post('/auth/login', {username: "zemuldo", password: "password"}).then(()=>{
            window.location = '/'
        })
    }>
            <input />
            <input />
            <button type='submit'>Login</button>
        </form>
    </div>
)

export default Home
