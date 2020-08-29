import React from 'react';
import useStyles from './Styles';

const Header: React.FC<{}> = () => {
    const classes = useStyles();
    return (
        <div className={classes.header__main}>
            <img 
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                className={classes.header__img__logo}
                alt="Instagram Logo"
            />
        </div>
    )
};

export default Header;