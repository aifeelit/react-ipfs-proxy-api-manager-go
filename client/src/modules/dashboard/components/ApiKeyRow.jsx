import React from 'react'
import Accordion from '@material-ui/core/Accordion'

const ApiKeyRow = ({ children }) => (
    <Accordion>
        {children}
    </Accordion>
)

export default ApiKeyRow