import React, { useState } from 'react';
import useStyles from './Styles';

// MUI Stuff
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';

// Icons
import SendIcon from '@material-ui/icons/Send';

const CustomInput = () => {
    const classes = useStyles();
    const [input, setInput] = useState('');

    const sendMessage = () => {

    }

    return (
        <form className={classes.input__form}>
            <FormControl className={classes.input__formControl}>
                <Box display="flex" flexDirection="row" className={classes.input__box}>
                    <Box className={classes.input__input}>
                        <Input
                            placeholder="Enter a message..."
                            value={input}
                            fullWidth
                            onChange={event => setInput(event.target.value)}/>
                    </Box>
                    <Box>
                        <IconButton
                            variant="contained"
                            color="primary"
                            type='submit'
                            disabled={!input}
                            onClick={sendMessage}
                            className={classes.input__iconButton}>
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Box>
            </FormControl>
        </form>
    )
};

export default CustomInput;
