import { getUserIsLoaded, getUserIsLoading } from './modules/user/reducers/user.reducer';
import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { debounceTime, filter, tap } from 'rxjs/operators';
import { UserLoadAction } from './modules/user/actions/user.actions';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    public loadingLazyRoute: boolean | undefined;

    public userIsLoading$ = this._store.pipe(select(getUserIsLoading));
    public userIsLoaded$ = this._store.pipe(select(getUserIsLoaded));

    public constructor(private readonly _router: Router, private readonly _store: Store) { }

    public ngOnInit(): void {
        this._store.dispatch(UserLoadAction());

        this._router.events.pipe(
            filter(e => e instanceof RouteConfigLoadStart || e instanceof RouteConfigLoadEnd),
            tap(() => {
                this.loadingLazyRoute = false;
            }),
            debounceTime(150),
            filter(e => e instanceof RouteConfigLoadStart)
        ).subscribe(() => {
            this.loadingLazyRoute = true;
        });
    }
}
