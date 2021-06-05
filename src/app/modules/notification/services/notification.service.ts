import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

@Injectable()
export class NotificationService {
    constructor(private readonly _snackBar: MatSnackBar, private readonly _translateService: TranslateService) {}

    public success(message: string): void {
        this._snackBar.openFromComponent(SnackBarComponent, {
            data: { message: this._translateService.instant(message) },
            duration: 2000,
        });
    }

    public error(message: string): void {
        this._snackBar.openFromComponent(SnackBarComponent, {
            data: { message: this._translateService.instant(message) },
            panelClass: ['jwt-error-notification'],
            duration: 10000,
        });
    }
}
