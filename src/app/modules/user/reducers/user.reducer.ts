import { UserSetThemeAction } from './../actions/user.actions';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { JwtUser } from 'src/types';
import { UserLoadAction, UserLoadFailAction, UserLoadSuccessAction } from '../actions/user.actions';

interface IUserState {
    user: JwtUser;
    loading: boolean;
    loaded: boolean;
}

export const initialState: IUserState = {
    user: null,
    loading: false,
    loaded: false,
};

export const userReducer = createReducer(
    initialState,
    on(UserLoadAction, (state) => ({
        ...state,
        loading: true,
    })),
    on(UserLoadSuccessAction, (state, { user }) => ({
        ...state,
        user,
        loading: false,
        loaded: true,
    })),
    on(UserLoadFailAction, (state) => ({
        ...state,
        loading: false,
    })),
    on(UserSetThemeAction, (state, { theme }) => ({
        ...state,
        user: new JwtUser({
            ...state.user,
            theme,
        }),
    }))
);

const selectState = createFeatureSelector<IUserState>('user');

export const getUserIsLoading = createSelector(selectState, (state) => state.loading);
export const getUserIsLoaded = createSelector(selectState, (state) => state.loaded);
export const getUser = createSelector(selectState, (state) => state.user);
