import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../redux/store';
import '../styles/GlobalStyle.js';  // Optional global styles
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <> <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
     </Provider> </>
  );
}

export default MyApp;
