import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { debounceTime, filter, tap } from 'rxjs/operators';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    public loadingLazyRoute: boolean | undefined;

    public constructor(private readonly _router: Router) { }

    public ngOnInit(): void {
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
