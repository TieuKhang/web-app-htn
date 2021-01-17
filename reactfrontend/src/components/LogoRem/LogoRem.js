import React, {useState,useEffect} from 'react'
import { Logo } from './Logo'
import {
    Link
  } from "react-router-dom";
import api from '../Api/Api'


export const LogoRem = () => {
    const [todo,setTodo] = useState([])
    const [addToDo,setAddToDo] = useState('')

    useEffect(() => {
        api
            .get('/uploadlogo')
            .then(response => {
                return response.data
            })
            .then(data => {
                console.log(data)
                setTodo(data)
            })
    },[])

    return (
        <div>
            <Logo toDoList = {todo}/>
        </div>
    )
}
