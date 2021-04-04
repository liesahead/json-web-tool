import { DefaultLoaderModule } from './modules/default-loader/default-loader.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { routes } from './routes';
import { LayoutModule } from './modules/layout/layout.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        LayoutModule,
        DefaultLoaderModule,
        MatButtonModule,
        MatIconModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
