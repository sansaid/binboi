import React, { useState } from 'react'
import styled from 'styled-components'

type InputType = {
    placeholder: string
    type: string
    onChangeHandler: React.ChangeEventHandler,
    defaultValue: () => string
}

type InputSet = Array<InputType>

enum Direction {
    L = "L",
    R = "R"
}

const SliderButtonContainer = styled.div`
    display: flex;
    direction: row;
`

const SliderButton = styled.button`
    background-color: transparent;
    border: none;
    font-weight: bold;
    color: white;
`

const FormInput = styled.input`
    background: #4C4246;
    border: none;
    padding: 10px;
    font-size: calc(14px + 2vmin);
    color: white;
    border-radius: 6px;
    margin: 4px;
`

const FormSubmit = styled.input`
    background: #17BEBB;
    border: none;
    padding: 10px;
    font-size: calc(14px + 2vmin);
    color: #2E282A;
    border-radius: 6px;
    margin: 4px;
    font-weight: 700;
`

// REF: https://www.techomoro.com/submit-a-form-data-to-rest-api-in-a-react-app/
function Form(): React.ReactElement {
    const [address, setAddress] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [inputIndex, setInputIndex] = useState(0)

    const inputTypes: InputSet = [
        {
            placeholder: 'Mobile number',
            type: 'text',
            onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => { setMobileNumber(e.target.value)  },
            defaultValue: () => mobileNumber
        },
        {
            placeholder: 'Address',
            type: 'text',
            onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => { setAddress(e.target.value)  },
            defaultValue: () => address
        }
    ]

    async function submitHandler(e: React.FormEvent) {
        e.preventDefault();

        const API: string = ""

        try {
            let res = await fetch(API, {
                method: "POST",
                body: JSON.stringify({
                    mobileNumber: mobileNumber,
                    address: address
                }),
            });
            
            if (res.status === 200) {
                setAddress("");
                setMobileNumber("");
            }
        } catch (err) {
            console.log(err);
        }
    }

    function keydownHandler(e: React.KeyboardEvent) {
        if (e.key === 'Enter') {
            e.preventDefault()

            if (inputIndex === (inputTypes.length - 1)) {
                return inputIndex
            }

            setInputIndex(inputIndex+1)
        }
    }

    function clickHandler(direction: Direction): React.MouseEventHandler {
        return (e: React.MouseEvent) => {
            switch(direction) {
                case Direction.R:
                    if (inputIndex === (inputTypes.length - 1)) {
                        return inputIndex
                    }

                    setInputIndex(inputIndex+1)
                    break;
                case Direction.L:
                    if (inputIndex === 0) {
                        return inputIndex
                    }

                    setInputIndex(inputIndex-1)
                    break;
                default:
                    console.log(`Unrecognised direction declared: ${direction}`)
            }
        }
    }

    function getInputType(index: number, inputs: InputSet) {
        return <>
            <FormInput 
                onKeyDown={keydownHandler} 
                onChange={inputs[index].onChangeHandler} 
                type={inputs[index].type} 
                placeholder={inputs[index].placeholder} 
                value={inputs[index].defaultValue()}
            />
        </>
    }

    return <>
        <form onSubmit={submitHandler}>
            {getInputType(inputIndex, inputTypes)}
            <FormSubmit type='submit' value="Bin me binboi"/>
        </form>
        <SliderButtonContainer>
            <SliderButton onClick={clickHandler(Direction.L)}>&lt;</SliderButton>
            <SliderButton onClick={clickHandler(Direction.R)}>&gt;</SliderButton>
        </SliderButtonContainer>       
    </>
}

export function FormSlider(): React.ReactElement {
    return <>
        <Form/> 
    </>
}