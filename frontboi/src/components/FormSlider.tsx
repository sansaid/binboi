import React, { useState } from 'react'
import styled from 'styled-components'

type FormProps = {
    inputIndex: number
}

// TODO: store the input value in state when the user presses enter
// REF: https://www.techomoro.com/submit-a-form-data-to-rest-api-in-a-react-app/
function Form({ inputIndex }: FormProps): React.ReactElement {
    function getInputType(index: number) {
        const inputType = [
            {
                placeholder: 'Mobile number',
                type: 'text'
            },
            {
                placeholder: 'Address',
                type: 'text'
            }
        ]

        return <>
            <input type={inputType[index].type} placeholder={inputType[index].placeholder} />
        </>
    }

    return <>
        <form>
            {getInputType(inputIndex)}
            <input type='submit' value="Bin me binboi"/>
        </form>          
    </>
}

export function FormSlider(): React.ReactElement {
    const [inputIndex, setInputIndex] = useState(0)

    return <>
        <Form inputIndex={inputIndex} />   
        <button>L</button>
        <button>R</button>
    </>
}