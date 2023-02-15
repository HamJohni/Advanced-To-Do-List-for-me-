import React, {useEffect, useState} from 'react';
import {AiFillEye} from 'react-icons/ai'
import {AiFillEyeInvisible} from 'react-icons/ai'
import {Link,useNavigate} from "react-router-dom"
import {useLocation} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {changeUsers} from "../../../../network/client/src/redux/reducers/users";

const Form = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const {pathname} = useLocation()

    const [eye,setEye] = useState(false)

    const {usersReg} = useSelector((state) => state.users)

    const {
        register,
        reset,
        handleSubmit,
        formState:{
            errors
        }} = useForm(
        {mode: "onBlur"}
    )

    const userRegister = (data) => {
        axios.post('http://localhost:8080x  /register', {
            ...data,
            categories: []
        }).then((res) => {
            dispatch(changeUsers({
                token: res.data.accessToken,
                ...res.data.user
            }))
            localStorage.setItem('user', JSON.stringify({
                token: res.data.accessToken,
                ...res.data.user
            }))
            reset()
            navigate('/')
        })
    }

    const userLogin = (data) => {
        axios.post('http://localhost:8080/login', {
            ...data,
        }).then((res) => {
            dispatch(changeUsers({
                token: res.data.accessToken,
                ...res.data.user
            }))
            localStorage.setItem('user', JSON.stringify({
                token: res.data.accessToken,
                ...res.data.user
            }))
            reset()
            navigate('/')
        })
            .catch((err) => alert(err.message))
    }

    const submit = (data) => {
        pathname === '/register' ? userRegister(data) : userLogin(data)
    }

    useEffect(() => {
        if(usersReg.length !== 0){
            navigate('/')
        }
    },[])

    return (
        <form noValidate className="form" onSubmit={handleSubmit(submit) }>

            <h1 className="form__title">{pathname === '/register' ? "Регистрация" : "Авторизация"}</h1>

            <div className="form__box">

                {
                    pathname === '/register' ?
                        <label className="form__label">
                            <input
                                {...register('login',{required: {message: "Логин обязателен к заполнению",value: true}, maxLength:{message: "Макимальная длина 10 символов",value: 10},minLength: {message: "Минмальная длина 3 символа",value: 3}})}
                            type="text" className="form__input" placeholder="Введите логин"/>
                            <p className="form__error">{errors.login && errors.login.message}</p>
                        </label> :
                        ''
                }

                <label className="form__label">
                    <input
                        {...register('email', {required: {message: "Поле email обязателен к заполнению",value: true},minLength: {message: "Вы неправильно ввели свой email",value: 8},pattern: {message: "Напишите свой email правильно",value: /^[^]+@[^ ]+\.[a-z]{2,5}$/}})}
                        type="email" className="form__input" placeholder="Введите email"/>
                    <p className="form__error">{errors.email && errors.email.message}</p>
                </label>

                <label className="form__label">
                    {eye? <AiFillEye onClick={() => setEye((prev) => !prev)} className="form__eye" size={23} /> : <AiFillEyeInvisible onClick={() => setEye((prev) => !prev)} className="form__eye" size={23} />}
                    <input
                        {...register('password',{required: {message: "Пароль обязателен к заполнению !",value: true},pattern: {value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g,message: "Пароль должен содержать не менее 6 символов, заглавную букву, число"}})}
                        type={eye? "text" : "password"} className="form__input" placeholder="Введите пароль"/>
                        <p className="form__error">{errors.password && errors.password.message}</p>
                </label>

                {/*{*/}
                {/*    pathname === "/register"?*/}
                {/*        <label className="form__label">*/}
                {/*            {eye? <AiFillEye onClick={() => setEye((prev) => !prev)} className="form__eye" size={23} /> : <AiFillEyeInvisible onClick={() => setEye((prev) => !prev)} className="form__eye" size={23} />}*/}
                {/*            <input*/}
                {/*                {...register('confirms',{*/}
                {/*                    required: {*/}
                {/*                        message: "Пароль обязателен к заполнению !",value: true*/}
                {/*                    },*/}
                {/*                    pattern: {*/}
                {/*                        value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g,*/}
                {/*                        message: "Пароли не совпадает"*/}
                {/*                    }})}*/}
                {/*                type={eye? "text" : "password"} className="form__input" placeholder="Подтвердите пароль"/>*/}
                {/*            <p className="form__error">*/}
                {/*                {errors.confirm && errors.confirm.message}*/}
                {/*            </p>*/}
                {/*        </label> :*/}
                {/*        ''*/}
                {/*}*/}
            </div>

            {
                pathname === '/register' ?
                    <button className="form__btn btn" type="submit">Зарегистрироваться</button>:

                    <button className="form__btn btn" type="submit">Войти</button>
            }

            {
                pathname === '/register' ?
                    <p className="form__have">У меня уже есть аккант, чтобы <Link to="/login" className="form__come">войти</Link></p>
                    :
                    <p className="form__have">У меня еще нет аккаунта,чтобы <Link to="/register" className="form__come">войти</Link></p>
            }

        </form>
    );
};

export default Form;