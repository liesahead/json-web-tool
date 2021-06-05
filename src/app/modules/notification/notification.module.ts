import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationService } from './services/notification.service';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [SnackBarComponent],
    imports: [CommonModule, MatSnackBarModule, TranslateModule, MatIconModule, MatButtonModule],
    providers: [NotificationService],
})
export class NotificationModule {}
