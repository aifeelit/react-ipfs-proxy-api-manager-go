import React from 'react'
import { makeStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(() => ({
    root: {
        textAlign: 'center',
        padding: 16,
        margin: '16px'
    }
}))

const Request = ({ date, size }) => {
    const classes = useStyles()
    return (
        <Paper variant="outlined" className={classes.root}>
            <Typography variant="body1"><b>Date:</b> {date.substring(0, 10)}<br /><b>Size:</b> {size} bytes</Typography>
        </Paper>
    )
}

export default Request