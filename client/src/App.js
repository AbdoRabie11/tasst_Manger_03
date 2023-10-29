import './App.css';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <Register />
    <ToastContainer position='top-center' />

    </>
  );
}

export default App;
