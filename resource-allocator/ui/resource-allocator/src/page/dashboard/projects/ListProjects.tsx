import { Box, Card, CardContent, CardHeader, Container, IconButton, Menu, MenuItem, Paper, Typography } from '@mui/material';
import React, { Fragment, useState } from 'react';
import Grid from '@mui/material/Grid2';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { PROJECTS } from '../../../common/constants';

const ListProjects = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [projectId, setProjectId] = useState(0);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event: any, projectId: number) => {
        console.log('projectIdeee', projectId);
        setProjectId(projectId);
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Fragment>
            <Container maxWidth="lg">
                <Paper elevation={3} sx={{ padding: '20px', margin: '5rem' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            {PROJECTS.map((p, i) => (
                                <Grid size={4} key={i}>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardHeader
                                            action={
                                                <IconButton aria-label="settings" onClick={(e) => handleMenuClick(e, p.p_id)}>
                                                    <MoreVertIcon />
                                                </IconButton>
                                            }
                                            title={p.p_name}
                                            subheader={p.p_date}
                                        />
                                        <CardContent>
                                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                {p.p_description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleMenuClose}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                                        <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                                        <MenuItem onClick={handleMenuClose}>Assign</MenuItem>
                                    </Menu>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </Fragment>
    )
}

export default ListProjects;