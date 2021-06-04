import { UserSettingsOpenDialogAction } from './../../../user/actions/user.actions';
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserToggleThemeAction } from 'src/app/modules/user/actions/user.actions';
import { getUser } from 'src/app/modules/user/reducers/user.reducer';
import { ApplicationThemes } from 'src/types';

@Component({
    selector: 'jwt-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    public isDarkTheme$: Observable<boolean> = this._store.pipe(
        select(getUser),
        map((u) => u?.theme === ApplicationThemes.Dark)
    );

    public constructor(private readonly _store: Store) {}

    public openSettingsDialog(): void {
        this._store.dispatch(UserSettingsOpenDialogAction());
    }

    public toggleTheme(): void {
        this._store.dispatch(UserToggleThemeAction());
    }
}
