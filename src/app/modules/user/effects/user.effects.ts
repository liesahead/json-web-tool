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
import { catchError, distinct, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { ApplicationThemes, JwtUser } from 'src/types';
import { APP_DARK_THEME_CLASS_NAME } from 'src/constants';
import { getUser } from '../reducers/user.reducer';

@Injectable()
export class UserEffects {
    public constructor(
        private readonly _store: Store,
        private readonly _actions: Actions,
        private readonly _userService: UserService
    ) {}

    public loadUser = createEffect(() =>
        this._actions.pipe(
            ofType(UserLoadAction),
            map(() => {
                const user = this._userService.getUser() ?? new JwtUser();

                return UserLoadSuccessAction({ user });
            }),
            catchError(() => of(UserLoadFailAction()))
        )
    );

    public loadUserSuccess = createEffect(() =>
        this._actions.pipe(
            ofType(UserLoadSuccessAction),
            map(({ user }) => UserSetThemeAction({ theme: user.theme }))
        )
    );

    public toggleTheme = createEffect(() =>
        this._actions.pipe(
            ofType(UserToggleThemeAction),
            map(() =>
                UserSetThemeAction({
                    theme:
                        this.getCurrentTheme() === ApplicationThemes.Dark
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
                tap(({ theme }) => this.toogleDarkTheme(theme ? theme === ApplicationThemes.Dark : undefined))
            ),
        { dispatch: false }
    );

    public saveUser = createEffect(
        () =>
            this._actions.pipe(
                ofType(UserSetThemeAction),
                withLatestFrom(this._store.pipe(select(getUser))),
                tap(([_, user]) => {
                    this._userService.setUser(user);
                })
            ),
        { dispatch: false }
    );

    private toogleDarkTheme(force?: boolean): void {
        document.documentElement.classList.toggle(APP_DARK_THEME_CLASS_NAME, force);
    }

    private getCurrentTheme(): ApplicationThemes {
        return document.documentElement.classList.contains(APP_DARK_THEME_CLASS_NAME)
            ? ApplicationThemes.Dark
            : ApplicationThemes.Light;
    }
}
