import '../src/styles/style.scss'
import Register from "./pages/Register/Register";
import {Route,Routes} from "react-router-dom"
import Login from "./pages/Login/Login";
import {useEffect} from "react";
import {changeUsers} from "../../network/client/src/redux/reducers/users";
import {useDispatch} from "react-redux";
import Home from "./pages/Home/Home";

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        if(localStorage.getItem('user') !== null){
            dispatch(changeUsers(JSON.parse(localStorage.getItem('user'))))
        }
    },[])

  return (
    <div className="App">
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={<Home/>}/>
        </Routes>
    </div>
  );
}

export default App;
