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
    UserToggleThemeAction,
} from '../actions/user.actions';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { ApplicationThemes, JwtUser } from 'src/types';
import { getUser } from '../reducers/user.reducer';
import { MatDialog } from '@angular/material/dialog';
import { UserSettingsDialogComponent } from '../components/user-settings-dialog/user-settings-dialog.component';
import { JwtUtils } from 'src/utils/utils';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../notification/services/notification.service';

@Injectable()
export class UserEffects {
    public constructor(
        private readonly _store: Store,
        private readonly _actions: Actions,
        private readonly _dialog: MatDialog,
        private readonly _userService: UserService,
        private readonly _translateService: TranslateService,
        private readonly _notificationService: NotificationService
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
            withLatestFrom(this._store.pipe(select(getUser))),
            map(([_, user]) =>
                UserSaveAction({
                    user: new JwtUser({
                        ...user,
                        theme: user.theme === ApplicationThemes.Dark ? ApplicationThemes.Light : ApplicationThemes.Dark,
                    }),
                })
            )
        )
    );

    public saveUser = createEffect(() =>
        this._actions.pipe(
            ofType(UserSaveAction),
            map(({ dialogId, user }) => {
                this._userService.saveUser(user);

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

                    this._notificationService.success('user.notifications.saveSuccess');
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
        this._translateService.use(user.language);

        JwtUtils.setTheme(user.theme);
    }
}
