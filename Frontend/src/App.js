import logo from './logo.svg';
import './App.css';
import Sidebar from './Pages/Sidebar';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Allroutes from './Allroutes/Allroutes';
import Navbar from './Components/Navbar';


function App() {
  return (
    <>
     <Navbar/>
     <Allroutes/>
    </>
  );
}

export default App;
