import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import useApiKeys from '../hooks/useApiKeys'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import BlockIcon from '@material-ui/icons/Block'

const useStyles = makeStyles(() => ({
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
    },
    summaryContent: {
        alignItems: 'center'
    }
}))

const Dashboard = () => {

    const { apiKeys, createApiKey, disableApiKey } = useApiKeys()
    const classes = useStyles()

    const handleDisable = (e, key) => {
        e.stopPropagation()
        disableApiKey(key)
    }

    const handleCreate = () => {
        createApiKey()
    }

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3} component={Paper}>
                <Grid item xs={12}>
                    <Typography variant="h4">Dashboard</Typography>
                </Grid>
                <Grid item xs={12}>
                    {
                        apiKeys.length > 0
                            ?
                            apiKeys.map((apiKey) => (
                                <Accordion>
                                    <AccordionSummary classes={{ content: classes.summaryContent }}
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <Typography variant="h6">Key: {apiKey.key}</Typography>
                                        <Chip
                                            label={apiKey.disabled ? "Disabled" : "Enabled"}
                                            className={clsx(classes.chip, apiKey.disabled ? classes.disabled : classes.enabled)}
                                        />
                                        {
                                            !apiKey.disabled &&
                                            <Chip
                                                className={classes.chipDisable}
                                                deleteIcon={<BlockIcon />}
                                                label="Disable"
                                                onClick={(e) => { handleDisable(e, apiKey.key) }}
                                                onDelete={() => { }}
                                                variant="outlined"
                                            />
                                        }
                                    </AccordionSummary>

                                    <AccordionDetails>
                                        <Typography>
                                            Requests: falopa
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))
                            :
                            <span>empty state</span>
                    }
                </Grid>
            </Grid>
        </Container>
    )
}

export default Dashboard
