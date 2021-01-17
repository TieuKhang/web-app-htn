import React from 'react';
import {
    Link
  } from "react-router-dom";

export const Logo = ({toDoList}) => {
    return (
        <>
            {toDoList.map(todoparam => {
                return(
                    <ul key = {todoparam.id}>
                        <li> 
                             {todoparam.logo}
                        </li>
                    </ul>
                )
            })}
        </>
    )
}

