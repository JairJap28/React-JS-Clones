// Models
import { User as FirebaseUser } from 'firebase';
import IUserData from '../Models/IUserData';

interface IFirebaseState {
    user?: FirebaseUser,
    userData?: IUserData 
}

export default IFirebaseState;