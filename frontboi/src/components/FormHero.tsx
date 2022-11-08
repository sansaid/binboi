import { ReturnObject } from 'ics'
import React, { useState } from 'react'
import { collectionsToIcs, Collection } from '../helpers/convert_to_ics'
import { AddressSelector } from './AddressSelector'
import { Form, FormSubmit, FormContainer, InputContainer } from './Form'
import { FormButtonContainer } from './FormNavigators'


// REF: https://www.techomoro.com/submit-a-form-data-to-rest-api-in-a-react-app/
export function FormHero(): React.ReactElement {
    const [uprn, setUprn] = useState('')
    const [downloadUrl, setDownloadUrl] = useState('')

    function generateicsFilename(): string {
        return `${uprn}-${new Date(Date.now()).toISOString()}.ics`
    }

    async function submitHandler(e: React.FormEvent) {
        e.preventDefault();
        
        let yearFromNowDate: Date = new Date()
        
        yearFromNowDate.setFullYear(yearFromNowDate.getFullYear() + 1)

        let yearFromNow: string = yearFromNowDate.toISOString().split('T')[0]

        console.log(uprn)

        if (uprn !== '') {
            let res = await fetch(`https://binboi-api.fly.dev/collections/${uprn}?to_date=${yearFromNow}`)
            let deserialisedRes = await res.json()
            console.log(deserialisedRes)

            if ("collections" in deserialisedRes) {
                if (Array.isArray(deserialisedRes.collections)) {
                    createDownloadUrl(deserialisedRes.collections)
                }
            }
        }
    }

    function createDownloadUrl(collections: Array<Collection>) {
        if (collections.length > 0) {
            const icsRes: ReturnObject = collectionsToIcs(collections)

            if (icsRes.error) {
                console.log(`Error producing ics: ${icsRes.error}`)
                return
            }

            const icsBlob: Blob = new Blob([icsRes.value!])

            setDownloadUrl(URL.createObjectURL(icsBlob))
        }
    }

    return <>
        <FormContainer>
            <Form onSubmit={submitHandler}>
                <InputContainer>
                    <AddressSelector onChange={(e) => setUprn(e.target.value as string)}/>
                </InputContainer>
                <FormButtonContainer>
                    { downloadUrl === '' ? <FormSubmit onClick={submitHandler}>Submit</FormSubmit> : <FormSubmit href={downloadUrl} download={generateicsFilename()}>Download Reminders</FormSubmit>}
                </FormButtonContainer>
            </Form>
        </FormContainer>
    </>
}