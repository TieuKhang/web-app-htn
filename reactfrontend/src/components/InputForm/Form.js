import React from 'react';

export const Form = ({userInput , onFormChange, onFormSubmit}) => {
    const handleChange = (event) => {
        onFormChange(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onFormSubmit()
    }
    return(
        <>
            <form onSubmit = {handleSubmit}>
                <input type='text' reuqired value = {userInput} onChange = {handleChange}/>
                <input type='submit' />
            </form>
        </>
    )
}