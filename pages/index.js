import Head from 'next/head'
import Axios from 'axios';

const Home = () => (
  <div className="container">
   <p>Home</p>

   <button onClick={() => Axios.post('/auth/logout').then(() => window.location = '/login')}>Logout</button>

  </div>
)

Home.getInitialProps = (ctx) => {
  let pageProps = {};
 
  if (ctx.req && ctx.req.session.passport) {
    pageProps.user = ctx.req.session.passport.user;
  }
  if(!pageProps.user) {
    ctx.res.writeHead(302, { Location: '/login' }).end()
  }
  return { pageProps };
}

export default Home
