import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserToggleThemeAction } from 'src/app/modules/user/actions/user.actions';

@Component({
    selector: 'jwt-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    public constructor(private readonly _store: Store) {}

    public toggleTheme(): void {
        this._store.dispatch(UserToggleThemeAction());
    }
}
