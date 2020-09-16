import React, { useEffect } from 'react';
import SavedProps, {
    ISavedStateToProps,
    ISavedActionsToProps
} from './SavedProps';
import useStyles from './Styles';

// Redux
import { connect } from 'react-redux'
import { RootState } from '../../Redux/Store/index';
import { changeOpenHelper } from '../../Redux/Actions/systemActions';

// Router
// Router
import {
    HOME
} from '../../Config/Route/Routes';
import { withRouter } from 'react-router-dom';

// Firebase
import { db } from '../../Firebase/Firebase';

// Models
import { IPost } from '../../Models/IPost';

// MUI Stuff
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}>
            {value === index && (
                <div>
                    {children}
                </div>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const Saved: React.FC<SavedProps> = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [liked, setLiked] = React.useState<Array<IPost>>([]);
    const [saved, setSaved] = React.useState<Array<IPost>>([]);
    const [own, setOwn] = React.useState<Array<IPost>>([]);

    useEffect(() => {
        if(props.user) {
            db
            .collection('user')
            .doc(props.user?.uid)
            .collection('like')
            .get()
            .then((snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
                setLiked(snapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        imageUrl: doc.data().imageUrl
                    }
                }));
            });

            db
            .collection('user')
            .doc(props.user?.uid)
            .collection('save')
            .get()
            .then((snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
                setSaved(snapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        imageUrl: doc.data().imageUrl
                    }
                }));
            });

            db
            .collection('posts')
            .where('username', '==', props.user.displayName)
            .get()
            .then((snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
                setOwn(snapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        imageUrl: doc.data().imageUrl
                    }
                }));
            });
        } else {
            props.history.push(HOME);
        }
    }, [props.user]);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Box>
                <Paper className={classes.saved__tabs}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Mis publicaciones" {...a11yProps(0)}/>
                        <Tab label="Me gusta" {...a11yProps(1)}/>
                        <Tab label="Guardado" {...a11yProps(2)}/>
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <Box
                            display="flex"
                            justifyContent="center"
                            minHeight="100vh">
                            <Grid 
                                container
                                className={classes.like__container}>
                                {own && own.map(post => (
                                    <Grid
                                        key={post.id + '-1'}
                                        item className={classes.like__item}>
                                        <img
                                            className={classes.like__image}
                                            src={post.imageUrl}
                                            alt="Post" />
                                        <div></div>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Box
                            display="flex"
                            justifyContent="center"
                            minHeight="100vh">
                            <Grid container className={classes.like__container}>
                                {liked && liked.map(post => (
                                    <Grid 
                                        key={post.id + '-2'}
                                        item className={classes.like__item}>
                                        <img
                                            className={classes.like__image}
                                            src={post.imageUrl}
                                            alt="Post" />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Box
                            display="flex"
                            justifyContent="center"
                            minHeight="100vh">
                            <Grid container spacing={1} className={classes.like__container}>
                                {saved && saved.map(post => (
                                    <Grid 
                                        key={post.id + '-3'}
                                        item className={classes.like__item}>
                                        <img
                                            className={classes.like__image}
                                            src={post.imageUrl}
                                            alt="Post" />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </TabPanel>
                </Paper>
            </Box>
        </Box>
    )
}

const mapStateToProps = (state: RootState): ISavedStateToProps => ({
    user: state.firebase.user,
    open: state.system.open || { open: false, component: '' }
})

const mapDispatchToProps: ISavedActionsToProps = {
    changeOpenHelper
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Saved))
