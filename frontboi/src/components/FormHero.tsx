import React, { useState } from 'react'
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
    align-items: center;
    height: calc(14px + 25vmin);
`

const FormInput = styled.input`
    background: #4C4246;
    border: none;
    padding: 10px;
    width: calc(200px + 20vmin);
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
    font-size: calc(14px + 2vmin);
    color: white;
    border-radius: 6px;
    margin: 4px;
`

const FormButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
`

const FormNavigator = styled.button`
    background: #13908D;
    border: none;
    width: calc(50px + 10vmin);
    font-size: calc(14px + 2vmin);
    color: #2E282A;
    border-radius: 6px;
    margin: 4px;
    font-weight: 700;
    height: calc(14px + 6vmin);
`

const FormSubmit = styled.input`
    background: #17BEBB;
    border: none;
    width: calc(50px + 10vmin);
    font-size: calc(14px + 2vmin);
    color: #2E282A;
    border-radius: 6px;
    margin: 4px;
    font-weight: 700;
    height: calc(14px + 6vmin);
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(14px + 30vmin);
`

function AddressSelector(): React.ReactElement {
    let [addresses, setAddresses] = useState([])

    async function getAddresses(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value.length > 3) {
            let encodedPostcode = encodeURIComponent(e.target.value)
            let res = await fetch(`https://binboi-server.fly.dev/addresses/${encodedPostcode}`)

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
            <FormInput type="text" placeholder="Postcode" onChange={getAddresses}/>
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
    const [mobileNumber, setMobileNumber] = useState('')
    const [inputIndex, setInputIndex] = useState(0)
    const [showSubmit, setShowSubmit] = useState(false)

    const formInputs: Array<React.ReactElement> = [
        <FormInput 
            onKeyDown={keydownHandler} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setMobileNumber(e.target.value)  }} 
            type='text'
            placeholder='Mobile number'
        />,
        <AddressSelector/>
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

            if (inputIndex === (formInputs.length - 1)) {
                return inputIndex
            }

            setInputIndex(inputIndex+1)
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
                    <FormNavigator onClick={navigatorClickHandler(Direction.L)}>Back</FormNavigator>
                    { showSubmit ? <FormSubmit type='submit' value="Submit"/> : <FormNavigator onClick={navigatorClickHandler(Direction.R)}>Next</FormNavigator> }
                </FormButtonContainer>
            </Form>
        </FormContainer>
    </>
}