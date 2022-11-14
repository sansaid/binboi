import { ReturnObject } from 'ics'
import React, { useState } from 'react'
import { collectionsToIcs, Collection } from '../helpers/convert_to_ics'
import { AddressSelector } from './AddressSelector'
import { Form, FormSubmit, FormDownload, FormContainer, InputContainer } from './Form'
import { FormButtonContainer } from './FormNavigators'
import ClipLoader from "react-spinners/ClipLoader";


// REF: https://www.techomoro.com/submit-a-form-data-to-rest-api-in-a-react-app/
export function FormHero(): React.ReactElement {
    const [uprn, setUprn] = useState('')
    const [downloadUrl, setDownloadUrl] = useState('')
    const [loading, setLoading] = useState(false);

    function generateicsFilename(): string {
        return `${uprn}-${new Date(Date.now()).toISOString()}.ics`
    }

    async function submitHandler(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);
        
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

        setLoading(false)
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
                    { downloadUrl === '' ? 
                    <FormSubmit onClick={submitHandler}>
                        { loading ? <ClipLoader
                            color={"#2E282A"}
                            loading={loading}
                            size={20}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        /> : "Submit" }
                    </FormSubmit> : <FormDownload href={downloadUrl} download={generateicsFilename()}>Download Reminders</FormDownload>}
                </FormButtonContainer>
            </Form>
        </FormContainer>
    </>
}