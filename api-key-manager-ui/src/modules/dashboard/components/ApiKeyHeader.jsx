import React from 'react'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import BlockIcon from '@material-ui/icons/Block'

const useStyles = makeStyles(() => ({
    root: {
        alignItems: 'center'
    },
    chip: {
        color: 'white',
        fontWeight: 500,
        margin: '0 10px',
        cursor: 'pointer'
    },
    enabled: {
        backgroundColor: 'green'
    },
    disabled: {
        backgroundColor: 'red'
    },
    chipDisable: {
        marginLeft: 'auto'
    }
}))

const ApiKeyHeader = ({ apiKey, handleDisable, handleGetRequests }) => {
    const { apikey, disabled, requests } = apiKey
    const classes = useStyles()
    return (
        <AccordionSummary classes={{ content: classes.root }}
            expandIcon={<ExpandMoreIcon />}
            onClick={() => !requests && handleGetRequests(apikey)}
        >
            <Typography variant="h6">Api Key: {apikey}</Typography>
            <Chip
                label={disabled ? "Disabled" : "Enabled"}
                className={clsx(classes.chip, disabled ? classes.disabled : classes.enabled)}
            />
            {
                !disabled &&
                <Chip
                    className={classes.chipDisable}
                    deleteIcon={<BlockIcon />}
                    label="Disable"
                    onClick={(e) => { handleDisable(e, apikey) }}
                    onDelete={(e) => { handleDisable(e, apikey) }}
                    variant="outlined"
                />
            }
        </AccordionSummary>
    )
}

export default ApiKeyHeader