import styled from 'styled-components'
import React, { useState } from 'react'
import { FormInput, FormSelect } from './Form'

export const AddressSelectorContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export function AddressSelector(props: { onKeyDown: (e: React.KeyboardEvent) => void }): React.ReactElement {
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