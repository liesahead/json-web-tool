import { createAction, props } from '@ngrx/store';
import { ApplicationThemes, JwtUser } from 'src/types';

export const UserSettingsOpenDialogAction = createAction('[User] Open settings dialog');

export const UserLoadAction = createAction('[User] Load');
export const UserLoadSuccessAction = createAction('[User] Load Success', props<{ user: JwtUser }>());
export const UserLoadFailAction = createAction('[User] Load Fail');

export const UserSaveAction = createAction('[User] Save', props<{ dialogId?: string; user: JwtUser }>());
export const UserSaveSuccessAction = createAction('[User] Save Success', props<{ dialogId?: string; user: JwtUser }>());
export const UserSaveFailAction = createAction('[User] Save Fail');

export const UserToggleThemeAction = createAction('[User] Toogle theme');
export const UserSetThemeAction = createAction('[User] Set theme', props<{ theme: ApplicationThemes }>());
