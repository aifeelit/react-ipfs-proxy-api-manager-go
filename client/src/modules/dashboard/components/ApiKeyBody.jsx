import React from 'react'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import { makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Request from './Request'


const useStyles = makeStyles(() => ({
    root: {
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    requestContainer: {
        display: 'flex',
        flexWrap: 'wrap'
    }
}))

const ApiKeyBody = ({ requests }) => {
    const classes = useStyles()
    
    return (
        <AccordionDetails className={classes.root}>
            <Typography variant="h6">Requests:</Typography>
            <div className={classes.requestContainer}>
                {
                    requests.length > 0
                        ?
                        requests.map((request, i) => (<Request key={`k${i}`} {...request} />))
                        :
                        <Typography variant="body1">No requests found</Typography>
                }
            </div>
        </AccordionDetails>
    )
}

export default ApiKeyBody