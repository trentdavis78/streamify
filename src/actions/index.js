import { SIGN_IN, SIGN_OUT, CREATE_STREAM } from './types';
import streams from '../apis/streams';
import { async } from 'q';

export const signIn = userID => {
    return {
        type: SIGN_IN,
        payload: userID
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const createStream = formValues => async dispatch => {
    const response = await streams.post('/streams', formValues);

    dispatch({ type: CREATE_STREAM, payload: response.data });
};
