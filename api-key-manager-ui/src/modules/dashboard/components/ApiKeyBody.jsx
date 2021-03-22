import React from 'react'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import { makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Request from './Request'
import CachedIcon from '@material-ui/icons/Cached'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles(() => ({
    root: {
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    requestContainer: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    metrics: {
        position: 'absolute',
        bottom: 6,
        right: 6
    }
}))

const ApiKeyBody = ({ requests, handleRefreshRequests }) => {
    const classes = useStyles()

    return (
        <AccordionDetails className={classes.root}>
            <Typography variant="h6">Requests:</Typography>
            <div className={classes.requestContainer}>
                {
                    requests && requests.length > 0
                        ?
                        <>
                            {requests.map((request, i) => (<Request key={`k${i}`} {...request} />))}

                            <div className={classes.metrics}>
                                {/* this metrics should be in the db but its too late now*/}
                                Count: {requests.length} | Total bytes: {requests.reduce((a, b) => +a + +b.size, 0)}

                                <Tooltip
                                    onClick={handleRefreshRequests}
                                    className={classes.refresh} title="Refresh">
                                    <IconButton>
                                        <CachedIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </>
                        :
                        <Typography variant="body1">No requests found</Typography>
                }
            </div>
        </AccordionDetails>
    )
}

export default ApiKeyBody