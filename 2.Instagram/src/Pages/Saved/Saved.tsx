import React, { useEffect } from 'react';
import SavedProps, {
    ISavedStateToProps,
    ISavedActionsToProps
} from './SavedProps';

// Redux
import { connect } from 'react-redux'
import { RootState } from '../../Redux/Store/index';
import { changeOpenHelper } from '../../Redux/Actions/systemActions';

export const Saved: React.FC<SavedProps> = (props) => {

    // if (!props.user) {
    //     props.changeOpenHelper(true, 'SignIn');
    // }
    

    return (
        <div>
            <h1>Saved Posts</h1>    
        </div>
    )
}

const mapStateToProps = (state: RootState): ISavedStateToProps => ({
    user: state.firebase.user,
    open: state.system.open || { open: false, component: '' }
})

const mapDispatchToProps: ISavedActionsToProps = {
    changeOpenHelper
}

export default connect(mapStateToProps, mapDispatchToProps)(Saved)
