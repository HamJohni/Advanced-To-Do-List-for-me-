import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {MdMenuOpen} from "react-icons/md"
import {BsPlusLg} from "react-icons/bs"
import {CgClose} from "react-icons/cg"
import {addColors} from "../../../utils/colors";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import {changeUsers} from "../../../../../network/client/src/redux/reducers/users";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Aside = () => {

    const {usersReg} = useSelector((state) => state.users)

    const dispatch = useDispatch()

    const [close,setClose] = useState(false)

    const [color,setColor] = useState(addColors[0])

    const [file,setFile] = useState('')


    const resAdd = () => {

        let newFile = {
            id: uuidv4(),
            file: file,
            color: color
        }

        axios.patch(`http://localhost:8080/users/${usersReg.id}`, {categories: [...usersReg.categories, newFile]})
            .then(({data}) => {
                dispatch(changeUsers({
                    ...data,
                    token: usersReg.token
                }))
                localStorage.setItem('user', JSON.stringify({
                    ...data,
                    token: usersReg.token
                }))
            })
            .catch((err) => toast(err.message))

        setClose(false)
        setFile('')
        setColor(addColors[0])
        toast("Категория добавлено!")
    }

    const addFile = () => {
        if(usersReg.categories.findIndex(item => item.  file === file) > -1){
            toast('Такой файл уже сущесвтует')
        }else {
            resAdd()
        }
    }

    const deleteFile = (id) => {

        let newFiles = usersReg.categories.filter(item => item.id !== id)

        axios.patch(`http://localhost:8080/users/${usersReg.id}`, {categories: newFiles})
            .then(({data}) => {
                dispatch(changeUsers({
                    ...data,
                    token: usersReg.token
                }))
                localStorage.setItem('user', JSON.stringify({
                    ...data,
                    token: usersReg.token
                }))
                toast("Файл успешно удален")
            })
            .catch((err) => toast(err.message))
    }

    return (
        <section className="home">
            <aside className="aside">
                <p className="aside__subtitle"><MdMenuOpen size={27}/>Все задачи</p>

                <div className="aside__list">

                    {
                        usersReg.categories.map(item => (
                            usersReg.length !== 0 ?
                            <p key={item.id} className="aside__item"><span style={{background: item.color}} className="aside__item-color"/>{item.file} <CgClose className="aside__item-del" size={20} onClick={() => deleteFile(item.id)}/></p>: ""
                        ))
                    }
                </div>

                <p className="aside__plus" onClick={() => setClose(true)}>
                    <BsPlusLg/>
                    Добавить папку
                </p>

                <div className={close ?"aside__add active" : "aside__add"} >

                    <input value={file} onChange={(e) => setFile(e.target.value)} type="text" className="aside__add-input" placeholder="Название папки" required/>

                    <div className="aside__add-storage">
                        {addColors.map(item => <span onClick={() => setColor(item)} className="aside__add-color" key={item} style={{background: item, border: item === color? '3.5px solid black' : "none"}}/>)}
                    </div>

                    <button className="aside__add-btn btn" type="submit" onClick={addFile}>Добавить</button>

                    <CgClose onClick={() => setClose(false)} size={20} className="aside__add-close"/>
                </div>
            </aside>
        </section>
    );
};

export default Aside;