import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './effects/user.effects';
import { userReducer } from './reducers/user.reducer';
import { UserSettingsDialogComponent } from './components/user-settings-dialog/user-settings-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { DefaultLoaderModule } from '../default-loader/default-loader.module';
import { CommonModule } from '@angular/common';
import { JwtResolveModule } from '../jwt-resolve/jwt-resolve.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [UserSettingsDialogComponent],
    imports: [
        CommonModule,
        StoreModule.forFeature('user', userReducer),
        EffectsModule.forFeature([UserEffects]),
        ReactiveFormsModule,
        MatDialogModule,
        MatSelectModule,
        MatFormFieldModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        TranslateModule,
        DefaultLoaderModule,
        JwtResolveModule,
    ],
})
export class UserModule {}
