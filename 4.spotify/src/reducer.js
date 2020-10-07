export const initialState = {
    user: null,
    //token: 'BQDiMYfFs5ebLFRIbRv7B6wI19DW2j22QERGlW8jT-j0OAV0CV1eD8wTAZ_ZEJe19IihlQtNtAWnLrB-Miv0Ut-qi5_BjpOJNQkyXaLT3M3zre5J0nFwYbO6y6V1ItUwxopzka9GbjuyTboUA2XlRohDjcNnd8OEbKA4YIuKwE9tcOeV',
    playlists: [],
    playing: false,
    item: null
};

const reducer = (state, action) => {
    console.log(action);
    switch(action.type){
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            };
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            };
        case 'SET_PLAYLIST':
            return {
                ...state,
                playlists: action.playlists
            };
        default:
            return state;
    }
}

export default reducer;