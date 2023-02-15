import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate,useNavigate} from "react-router-dom";
import Aside from "./Aside/Aside";
import {HiOutlineUserCircle} from 'react-icons/hi'
import {changeUsers} from "../../../../network/client/src/redux/reducers/users";
import { ToastContainer} from 'react-toastify';


const Home = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const {usersReg} = useSelector((state) => state.users)


    const exitUser = () => {
        localStorage.removeItem('user')
        dispatch(changeUsers({}))
    }

    if(usersReg.length === 0){
        return <Navigate to="/login"/>
    }

    return (
        <section className="home">
            <Aside/>
            <p className="home__exit">
                <HiOutlineUserCircle size={30}/>
                {usersReg.login}
            </p>
            <button onClick={exitUser} className="home__exit-btn btn">Выйти из акккаунта</button>
            <ToastContainer/>
        </section>
    );
};

export default Home;