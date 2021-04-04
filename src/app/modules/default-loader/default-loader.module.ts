import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLoaderComponent } from './components/default-loader/default-loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [DefaultLoaderComponent],
    exports: [DefaultLoaderComponent],
    imports: [CommonModule, MatProgressSpinnerModule],
})
export class DefaultLoaderModule {}
