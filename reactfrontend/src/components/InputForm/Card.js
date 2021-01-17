import React from 'react';
import {
    Link
  } from "react-router-dom";

export const Card = ({toDoList}) => {
    return (
        <>
            {toDoList.map(todoparam => {
                return(
                    <ul key = {todoparam.id}>
                        <li> 
                            <Link to = {`${todoparam.id}`}> {todoparam.content} </Link>
                        </li>
                    </ul>
                )
            })}
        </>
    )
}

