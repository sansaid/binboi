import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

enum Direction {
    L = "L",
    R = "R"
}

const FormContainer = styled.div`
    display: flex;
    direction: row;
`

const AddressSelectorContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const InputContainer = styled.div`
    display: flex;
    height: calc(14px + 25vmin);
    align-content: flex-start;
`

const FormInput = styled.input`
    background: #4C4246;
    border: none;
    padding: 10px;
    width: calc(200px + 20vmin);
    height: 7vmin;
    font-size: calc(14px + 2vmin);
    color: white;
    border-radius: 6px;
    margin: 4px;
`

const FormSelect = styled.select`
    background: #4C4246;
    border: none;
    padding: 10px;
    width: calc(220px + 20vmin);
    height: 8vmin;
    font-size: calc(14px + 2vmin);
    color: white;
    border-radius: 6px;
    margin: 20px 4px;
`

const FormButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
`

const FormNavigatorSecondary = styled.button`
    background: rgba(0,0,0,0);
    border: solid 0.2em #6E75FF;
    font-size: calc(14px + 2vmin);
    color: #6E75FF;
    border-radius: 6px;
    margin: 4px;
    font-weight: 700;
    height: calc(14px + 6vmin);
    flex-grow: 1;
`

const FormNavigatorPrimary = styled(FormNavigatorSecondary)`
    background: #6E75FF;
    border: none;
    color: #2E282A;
    flex-grow: 1;
`

const FormSubmit = styled.input`
    background: #1BDAD7;
    border: none;
    font-size: calc(14px + 2vmin);
    color: #2E282A;
    border-radius: 6px;
    margin: 4px;
    font-weight: 700;
    height: calc(14px + 6vmin);
    flex-grow: 1;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(14px + 30vmin);
`

function AddressSelector(props: { onKeyDown: (e: React.KeyboardEvent) => void }): React.ReactElement {
    let [addresses, setAddresses] = useState([])

    async function getAddresses(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value.length > 3) {
            let encodedPostcode = encodeURIComponent(e.target.value)
            let res = await fetch(`https://binboi-api.fly.dev/addresses/${encodedPostcode}`)

            let addresses = await res.json()
    
            if ("Addresses" in addresses) {
                if (Array.isArray(addresses.Addresses)) {
                    setAddresses(addresses.Addresses)
                }
            }
        }
    }

    return <>
        <AddressSelectorContainer>
            <FormInput type="text" placeholder="Postcode" onKeyDown={props.onKeyDown} onChange={getAddresses} />
            <FormSelect id="addresses" name="addresses">
                {addresses.length === 0 ? <option value="">Addresses not found</option> : addresses.map((address) => {
                    return <option key={address["SiteId"]} value={address["AccountSiteUprn"]}>{address["SiteShortAddress"]}</option>
                })}
            </FormSelect>
        </AddressSelectorContainer>
    </>
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