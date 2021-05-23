import { createAction, props } from '@ngrx/store';
import { ApplicationThemes, JwtUser } from 'src/types';

export const UserLoadAction = createAction('[User] Load');
export const UserLoadSuccessAction = createAction('[User] Load Success', props<{ user: JwtUser }>());
export const UserLoadFailAction = createAction('[User] Load Fail');

export const UserToggleThemeAction = createAction('[User] Toogle theme');
export const UserSetThemeAction = createAction('[User] Set theme', props<{ theme: ApplicationThemes }>());
