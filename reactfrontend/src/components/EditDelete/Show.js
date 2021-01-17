import React, {useState,useEffect} from 'react';
import {Delete} from './Delete'
import {Edit} from './Edit'
import {
    useParams,useHistory,
    Link
  } from "react-router-dom";
import api from '../Api/api'

export const Show = () => {
    const {id} = useParams()
    const [toDo,setTodo] = useState([])
    const [edit,setEdit] = useState('')
    const [clickEdit,setClickEdit] = useState(false)
    const history = useHistory()

    useEffect(() => {
        api
            .get(`/api/${id}`)
            .then(response => {
                return response.data
            })
            .then(data => {
                console.log(data)
                setTodo(data)
            })
    },[id])

    const handleEditChange = (inputVal) => {
        setEdit(inputVal)
        console.log(edit)
    }

    const handleEditSubmit = () => {
        api
            .post(`/api/create/${id}`,{
                id: id,
                content: edit
            })
            .then(
                setEdit('')
            )
            .then(
                upDateEdit()
            )
    }

    const upDateEdit = () => {
        api
            .get(`/api/${id}`)
            .then(response => {
                return response.data
            })
            .then(data => {
                setClickEdit(false)
                setTodo(data)
            })
    }
    
    const onClickEdit = () => {
        setClickEdit(true)
    }

    const onCancelClickEdit = () => {
        setClickEdit(false)
    }

    return(
        <div>
            {toDo.length > 0 && toDo.map(data => <div> {data.content} </div>)}
            {   clickEdit === false &&
                <>
                    <Delete id={id}/>
                    <span>   </span>
                    <span>   </span>
                    <button onClick = {onClickEdit}> Edit </button>
                </>
            }
            {   clickEdit === true &&
                <>
                    <Edit userInput={edit} onFormChange = {handleEditChange} onFormSubmit = {handleEditSubmit}/>
                    <button onClick={onCancelClickEdit}>Cancel</button>
                </>
            }
            <hr></hr>
            <Link to='/'> Back to Todo </Link>
        </div>
    )
}