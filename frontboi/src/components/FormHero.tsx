import React, { useEffect, useState } from 'react'
import { AddressSelector } from './AddressSelector'
import { Form, FormSubmit, FormContainer, InputContainer } from './Form'
import { FormButtonContainer, FormNavigatorSecondary, FormNavigatorPrimary } from './FormNavigators'

enum Direction {
    L = "L",
    R = "R"
}

// REF: https://www.techomoro.com/submit-a-form-data-to-rest-api-in-a-react-app/
export function FormHero(): React.ReactElement {
    const [address, setAddress] = useState('')
    const [inputIndex, setInputIndex] = useState(0)
    const [showSubmit, setShowSubmit] = useState(false)
    const [showSubmitOnly, setShowSubmitOnly] = useState(false)

    const formInputs: Array<React.ReactElement> = [
        <AddressSelector onKeyDown={keydownHandler} />
    ]

    useEffect(() => {
        // If there's only one element in the form, just show the submit button only
        if (formInputs.length === 1) {
            setShowSubmitOnly(true)
        }
    }, [formInputs.length]);

    async function submitHandler(e: React.FormEvent) {
        e.preventDefault();

        const API: string = ""

        try {
            let res = await fetch(API, {
                method: "POST",
                body: JSON.stringify({
                    address: address
                }),
            });
            
            if (res.status === 200) {
                setAddress("");
            }
        } catch (err) {
            console.log(err);
        }
    }

    function keydownHandler(e: React.KeyboardEvent) {
        if (e.key === 'Enter') {
            e.preventDefault()

            let isCurrInputLastFormInput = inputIndex === (formInputs.length - 1)
            let isNextInputLastFormInput = inputIndex === (formInputs.length - 2)

            if (!isCurrInputLastFormInput) {
                setInputIndex(inputIndex+1)   
            }

            if (!showSubmit && isNextInputLastFormInput) {
                setShowSubmit(true)
            } else if (showSubmit && !isNextInputLastFormInput) {
                setShowSubmit(false)
            }
        }
    }

    function navigatorClickHandler(direction: Direction): React.MouseEventHandler {
        return (e: React.MouseEvent) => {
            let isCurrInputLastFormInput = inputIndex === (formInputs.length - 1)
            let isCurrInputFirstFormInput = inputIndex === 0
            let isNextInputLastFormInput = inputIndex === (formInputs.length - 2)

            switch(direction) {
                case Direction.R:
                    if (isCurrInputLastFormInput) {
                        return inputIndex
                    }

                    setInputIndex(inputIndex+1)
                    break;
                case Direction.L:
                    if (isCurrInputFirstFormInput) {
                        return inputIndex
                    }

                    setInputIndex(inputIndex-1)
                    break;
                default:
                    console.log(`Unrecognised direction used: ${direction}`)
            }

            if (!showSubmit && isNextInputLastFormInput) {
                setShowSubmit(true)
            } else if (showSubmit && !isNextInputLastFormInput) {
                setShowSubmit(false)
            }
        }
    }

    return <>
        <FormContainer>
            <Form onSubmit={submitHandler}>
                <InputContainer>
                    {formInputs[inputIndex]}
                </InputContainer>
                <FormButtonContainer>
                    { showSubmitOnly ? <></> : <FormNavigatorSecondary onClick={navigatorClickHandler(Direction.L)}>Back</FormNavigatorSecondary> }
                    { showSubmit || showSubmitOnly ? <FormSubmit type='submit' value="Submit"/> : <FormNavigatorPrimary onClick={navigatorClickHandler(Direction.R)}>Next</FormNavigatorPrimary> }
                </FormButtonContainer>
            </Form>
        </FormContainer>
    </>
}