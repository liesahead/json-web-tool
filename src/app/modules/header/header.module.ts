import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LogoComponent } from './components/logo/logo.component';
import { JwtResolveModule } from '../jwt-resolve/jwt-resolve.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [HeaderComponent, LogoComponent],
    exports: [HeaderComponent],
    imports: [
        CommonModule,
        TranslateModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        JwtResolveModule,
    ],
})
export class HeaderModule {}
