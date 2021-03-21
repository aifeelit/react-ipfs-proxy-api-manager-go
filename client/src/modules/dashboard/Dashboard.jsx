import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import useApiKeys from '../../hooks/useApiKeys'
import { makeStyles } from '@material-ui/core'
import ApiKeyRow from './components/ApiKeyRow'
import ApiKeyHeader from './components/ApiKeyHeader'
import ApiKeyBody from './components/ApiKeyBody'

const useStyles = makeStyles(() => ({
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
                                <ApiKeyRow key={apiKey.key}>
                                    <ApiKeyHeader apiKey={apiKey} handleDisable={handleDisable} />
                                    <ApiKeyBody requests={apiKey.requests} />
                                </ApiKeyRow>
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