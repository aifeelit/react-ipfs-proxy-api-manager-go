import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
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
import Request from '../components/Request'

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
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 75
    },
    emptyState: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paper: {
        minHeight: 200,
        maxHeight: '75vh',
        overflow: 'auto'
    },
    requestContainer: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    accordionDetails: {
        flexWrap: 'wrap',
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
            <Grid container spacing={3} component={Paper} className={classes.paper}>
                <Grid item xs={12} className={classes.titleContainer}>
                    <Typography variant="h4">Dashboard</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCreate}>
                        Create API Key
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    {
                        apiKeys.length > 0
                            ?
                            apiKeys.map((apiKey) => (
                                <Accordion key={apiKey.key}>
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

                                    <AccordionDetails className={classes.accordionDetails}>
                                        <Typography variant="h6">Requests:</Typography>
                                        <div className={classes.requestContainer}>
                                            {
                                                apiKey.requests.length > 0
                                                    ?
                                                    apiKey.requests.map((request, i) => (<Request key={`k${i}`} {...request} />))
                                                    :
                                                    <Typography variant="body1">No requests found</Typography>
                                            }
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            ))
                            :
                            <div className={classes.emptyState}>
                                <Typography variant="h4">No API Keys found</Typography>
                            </div>
                    }
                </Grid>
            </Grid>
        </Container>
    )
}

export default Dashboard