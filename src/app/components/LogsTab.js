import React from 'react';
import { TextArea } from '@react95/core';

const LogsTab = ({ logs }) => {
    return (
        <TextArea rows={5} cols={50} value={logs || ''} styele={{ fontSize: 10 }} />
    )
}

export default LogsTab