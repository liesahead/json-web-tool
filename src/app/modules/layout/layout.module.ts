import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderModule } from '../header/header.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [LayoutComponent],
    imports: [CommonModule, RouterModule, HeaderModule],
})
export class LayoutModule {}
