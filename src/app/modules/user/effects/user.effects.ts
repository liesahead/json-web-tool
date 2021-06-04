import {
    UserSaveAction,
    UserSaveFailAction,
    UserSaveSuccessAction,
    UserSettingsOpenDialogAction,
} from './../actions/user.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import {
    UserLoadAction,
    UserLoadFailAction,
    UserLoadSuccessAction,
    UserSetThemeAction,
    UserToggleThemeAction,
} from '../actions/user.actions';
import { catchError, debounceTime, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { ApplicationThemes, JwtUser } from 'src/types';
import { getUser } from '../reducers/user.reducer';
import { MatDialog } from '@angular/material/dialog';
import { UserSettingsDialogComponent } from '../components/user-settings-dialog/user-settings-dialog.component';
import { JwtUtils } from 'src/utils/utils';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class UserEffects {
    public constructor(
        private readonly _store: Store,
        private readonly _actions: Actions,
        private readonly _dialog: MatDialog,
        private readonly _userService: UserService,
        private readonly _translateService: TranslateService
    ) {}

    public loadUser = createEffect(() =>
        this._actions.pipe(
            ofType(UserLoadAction),
            switchMap(() => {
                const user = this._userService.getUser() ?? new JwtUser();

                this.setUserPreferences(user);

                return [UserLoadSuccessAction({ user })];
            }),
            catchError(() => of(UserLoadFailAction()))
        )
    );

    public toggleTheme = createEffect(() =>
        this._actions.pipe(
            ofType(UserToggleThemeAction),
            map(() =>
                UserSetThemeAction({
                    theme:
                        JwtUtils.getCurrentTheme() === ApplicationThemes.Dark
                            ? ApplicationThemes.Light
                            : ApplicationThemes.Dark,
                })
            )
        )
    );

    public setTheme = createEffect(
        () =>
            this._actions.pipe(
                ofType(UserSetThemeAction),
                tap(({ theme }) => JwtUtils.toogleDarkTheme(theme ? theme === ApplicationThemes.Dark : undefined))
            ),
        { dispatch: false }
    );

    public saveUser = createEffect(() =>
        this._actions.pipe(
            ofType(UserSaveAction),
            // To imitate that saving takes some time :) Just having fun, let's remove later?
            debounceTime(400),
            map(({ dialogId, user }) => {
                this._userService.saveUser(user);

                // TODO: show notification (snackbar?)

                return UserSaveSuccessAction({ dialogId, user });
            }),
            catchError(() => of(UserSaveFailAction()))
        )
    );

    public saveUserSuccess = createEffect(
        () =>
            this._actions.pipe(
                ofType(UserSaveSuccessAction),
                tap(({ dialogId, user }) => {
                    this.setUserPreferences(user);

                    this._dialog.getDialogById(dialogId)?.close();
                })
            ),
        { dispatch: false }
    );

    public saveUserOnThemeSet = createEffect(
        () =>
            this._actions.pipe(
                ofType(UserSetThemeAction),
                withLatestFrom(this._store.pipe(select(getUser))),
                tap(([_, user]) => {
                    this._userService.saveUser(user);
                })
            ),
        { dispatch: false }
    );

    public openSettingsDialog = createEffect(
        () =>
            this._actions.pipe(
                ofType(UserSettingsOpenDialogAction),
                tap(() =>
                    this._dialog.open(UserSettingsDialogComponent, {
                        width: '600px',
                    })
                )
            ),
        { dispatch: false }
    );

    private setUserPreferences(user: JwtUser): void {
        // Set language
        this._translateService.use(user.language);

        // Set theme
        JwtUtils.setTheme(user.theme);
    }
}
