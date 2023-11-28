import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
    value: AuthState;
}

type AuthState = {
    isAuth: boolean;
    account: any;
    isAdmin: false;
}

const initialState = {
    value: {
        isAuth: false,
        account: [],
        isAdmin: false,
    } as AuthState,
} as InitialState;

export const auth = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        signOut: () => {
            return initialState;
        },

        signIn: (state, action: PayloadAction<string>) => {
            return {
                value: {
                    isAuth: true,
                    account: action.payload,
                    isAdmin: false,
                }
            }
        },

    }
})

export const { signIn, signOut } = auth.actions;
export default auth.reducer;