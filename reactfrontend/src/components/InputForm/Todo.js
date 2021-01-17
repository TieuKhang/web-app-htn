import React, {useState,useEffect} from 'react'
import { Card } from './Card'
import { Form } from './Form'
import {
    Link
  } from "react-router-dom";
import api from '../Api/Api'


export const Todo = () => {
    const [todo,setTodo] = useState([])
    const [addToDo,setAddToDo] = useState('')

    useEffect(() => {
        api
            .get('/api')
            .then(response => {
                return response.data
            })
            .then(data => {
                console.log(data)
                setTodo(data)
            })
    },[])

    const handleFormChange = (inputVal) => {
        setAddToDo(inputVal)
        console.log(addToDo)
    }

    const handleFormSubmit = () => {
        api
            .post('/api/create',{
                content: addToDo
            })
            .then(msg => {
              console.log(msg)
              setAddToDo('')
              updateData()
        })
    }

    const updateData = () => {
        api
            .get('/api')
            .then(response => {
                return response.data
            })
            .then(data => {
                console.log(data)
                setTodo(data)
            })
    }

    return (
        <div>
            <Form userInput = {addToDo} onFormChange = {handleFormChange} onFormSubmit = {handleFormSubmit}/>
            <Card toDoList = {todo}/>
        </div>
    )
}
