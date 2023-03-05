import '../styles/globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer limit={1} toastStyle={{ backgroundColor: "whitesmoke" }} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp