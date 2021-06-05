import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { INotification } from 'src/types';

@Component({
    selector: 'jwt-snack-bar',
    templateUrl: './snack-bar.component.html',
    styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent {
    constructor(
        @Inject(MAT_SNACK_BAR_DATA) public data: INotification,
        private readonly _snackBarRef: MatSnackBarRef<SnackBarComponent>
    ) {}

    public close(): void {
        this._snackBarRef.dismiss();
    }
}
