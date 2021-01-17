import React, {useState,useEffect} from 'react'
import {
    useHistory
  } from "react-router-dom";
import api from '../Api/Api'

export const Delete = ({id}) => {
    const history = useHistory()
    const deleteTodo = () => {
        api
            .post(`/api/${id}/delete`,{
                id: id
            })
            .then(
                history.push('/')
            )
    }

    return(
        <>
            <button onClick = {deleteTodo}> Delete </button>
        </>
    )
}