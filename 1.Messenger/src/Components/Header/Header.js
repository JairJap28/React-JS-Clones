import React, { useState } from 'react';
import useStyles from './Styles';

// Redux
import { connect } from 'react-redux';
import { setUsername } from '../../Redux/Actions/UiActions';

// MUI Stuff
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';

// Icons
import CachedIcon from '@material-ui/icons/Cached';

const Header = (props) => {
    const imgLogo = "https://en.facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=54&h=54";
    const classes = useStyles();

    const [username, setUsername] = React.useState('');

    const handleChange = (event) => {
        setUsername(event.target.value);
        props.setUsername(event.target.value);
    }

    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            className={classes.header__box}>
            <Box>
                <img src={imgLogo} alt="Messenger logo" />
            </Box>
            <Box flexGrow={1}>
                <h1>Hello Force Of Code</h1>
            </Box>
            <Box className={classes.header__input__username}>
                <FormControl focused={!Boolean(username)}>
                    <InputLabel className={classes.header__label__username}>
                        Username
                    </InputLabel>
                    <Input 
                        value={username}
                        onChange={handleChange}/>
                </FormControl>
                <IconButton className={classes.header__iconButton}>
                    <CachedIcon />
                </IconButton>
            </Box>
        </Box> 
    )
};

const mapActionsToProps = {
    setUsername
}

export default connect(null, mapActionsToProps)(Header);
