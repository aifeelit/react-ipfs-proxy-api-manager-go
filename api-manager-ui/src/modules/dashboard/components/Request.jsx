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

const Request = ({ datetime, size }) => {
    const classes = useStyles()
    return (
        <Paper variant="outlined" className={classes.root}>
            <Typography variant="body1"><b>Date:</b> {datetime}<br /><b>Size:</b> {size}mb</Typography>
        </Paper>
    )
}

export default Request