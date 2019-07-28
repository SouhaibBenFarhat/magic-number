import React from 'react'
import { Input } from '@react95/core';


const Result = ({ magicNumbers, loading }) => {

    if (loading) return (<p>Please wait...</p>)
    if (magicNumbers.length === 0) return (<p>Please select a range and click start...</p>)
    return (
        magicNumbers.map((magicNumber, index) => {
            return (
                <div key={index}>
                    <Input disabled={true} value={magicNumber} />
                </div>)
        })
    )

}

export default Result;