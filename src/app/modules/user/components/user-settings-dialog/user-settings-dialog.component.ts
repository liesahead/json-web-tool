import { UserSaveAction } from '../../actions/user.actions';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { ApplicationThemes, JwtUser } from 'src/types';
import { getUser, getUserIsSaving } from '../../reducers/user.reducer';
import { JwtConstants } from 'src/constants';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'jwt-user-settings-dialog',
    templateUrl: './user-settings-dialog.component.html',
})
export class UserSettingsDialogComponent implements OnInit {
    public get formControls(): Record<string, FormControl> {
        return this.form.controls as Record<string, FormControl>;
    }

    public get hasUnsavedChanges(): boolean {
        return this.form?.dirty;
    }

    public userIsSaving$ = this._store.pipe(select(getUserIsSaving));

    public form: FormGroup;
    public themes = Object.values(ApplicationThemes);
    public languages = JwtConstants.availableLanguages;

    public constructor(
        private readonly _dialogRef: MatDialogRef<UserSettingsDialogComponent>,
        private readonly _store: Store
    ) {}

    public ngOnInit(): void {
        this._store.pipe(take(1), select(getUser)).subscribe((u) => {
            this.form = new FormGroup({
                theme: new FormControl(u.theme, Validators.required),
                language: new FormControl(u.language, Validators.required),
            });
        });
    }

    public save(): void {
        const user = new JwtUser(this.form.value);

        this._store.dispatch(UserSaveAction({ dialogId: this._dialogRef.id, user }));
    }
}
