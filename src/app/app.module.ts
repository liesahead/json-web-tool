import { RootStoreModule } from './modules/root-store/root-store.module';
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
import { UserModule } from './modules/user/user.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { JwtConstants } from 'src/constants';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { translationsLoaderFactory } from 'src/utils/translate-http-loader';
import { NotificationModule } from './modules/notification/notification.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RootStoreModule,
        UserModule,
        RouterModule.forRoot(routes),
        LayoutModule,
        DefaultLoaderModule,
        MatButtonModule,
        MatIconModule,
        NotificationModule,
        TranslateModule.forRoot({
            defaultLanguage: JwtConstants.defaultLanguage,
            loader: {
                provide: TranslateLoader,
                useFactory: translationsLoaderFactory,
                deps: [HttpClient],
            },
            isolate: false,
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
