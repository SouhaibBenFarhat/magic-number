import React from 'react'
import { Input } from '@react95/core';


const GeneralTab = ({ onRangeChange, range }) => {
    return (
        <Input placeholder='Pleas enter a number...' onChange={onRangeChange} value={range} type='number' />
    )
}

export default GeneralTab
