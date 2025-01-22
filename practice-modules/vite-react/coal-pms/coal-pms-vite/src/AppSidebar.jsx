import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import RegistrtationMUI from './pages/Auth/RegistrationMUI'
import Login from './pages/Auth/Login'
import Registrtation from './pages/Auth/Registration'
import BasicTable from './pages/List/BasicTable'
import DependableDropdown from './pages/Dropdowns/DependableDropdown'
import DependableUsingPkg from './pages/Dropdowns/DependableUsingPkg'
import FilterTable from './pages/List/FilterTable'
import SearchableDropdown from './pages/Dropdowns/SearchableDropdown'
import TableCheckbox from './pages/List/TableCheckbox'
import SingleFileUpload from './pages/FileUpload/SingleFileUpload'
import NewUser from './pages/User/NewUser'
import AutocompleteBox from './pages/Dropdowns/AutocompleteBox'
import Test from './pages/TestRuns/Test'
import CKeditorComponent from './pages/Editor/CKeditorComponent'
import MultiSelectBox from './pages/Dropdowns/MultiSelectBox'
import SearchUserInTable from './pages/User/SearchUserInTable'
import MultipleFileUpload from './pages/FileUpload/MutipleFileUpload'
import FileDownloadEx from './pages/FileUpload/FileDownloadEx'
import Template from './pages/Editor/Template'
import SingleCheckboxTable from './pages/List/SingleCheckboxTable'
import { PageContainer } from '@toolpad/core/PageContainer';
import { pageRoutes } from './pageRoutes';

const drawerWidth = 240;

function AppSidebar(props) {
    const { window } = props;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { 
                            boxSizing: 'border-box', 
                            width: drawerWidth, 
                            backgroundColor: '#BCD6EF'
                        },
                    }}
                    open
                >
                    <div>
                        {/* <Toolbar /> */}
                        <Typography variant="h5" component="h5" className='my-3'>
                            <DashboardIcon sx={{color:'#00008B'}} className='me-2' />
                            My App
                        </Typography>
                        <Divider />
                        <List>
                            {pageRoutes.map((item, index) => (
                                <ListItem key={item.path} disablePadding>
                                    <ListItemButton component={Link} to={item.path}>
                                        <ListItemIcon sx={{color:'#00008B'}}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.label}
                                            primaryTypographyProps={{ style: { fontSize: '12px' } }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                    </div>
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <PageContainer>
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            {pageRoutes.map(({ path, element: Component }) => (
                                <Route key={path} path={path} element={<Component />} />
                            ))}
                        </Routes>
                    </React.Suspense>
                </PageContainer>
            </Box>
        </Box>
    );
}

AppSidebar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window: PropTypes.func,
};

export default AppSidebar;
