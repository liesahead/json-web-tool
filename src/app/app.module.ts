import { RootStoreModule } from './modules/root-store/root-store.module';
import { DefaultLoaderModule } from './modules/default-loader/default-loader.module';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { routes } from './routes';
import { LayoutModule } from './modules/layout/layout.module';
import { UserModule } from './modules/user/user.module';
import { JwtConstants } from 'src/constants';
import { coerceArray } from '@angular/cdk/coercion';

function getCurentLocale(): string {
    const browserLanguages = navigator.languages ?? coerceArray(navigator.language);

    const selectedLanguage = JwtConstants.availableSystemLanguages
        .map(({ name }) => name)
        .find((l) => browserLanguages.includes(l));

    return 'ru' || selectedLanguage || 'en';
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RootStoreModule,
        UserModule,
        RouterModule.forRoot(routes),
        LayoutModule,
        DefaultLoaderModule,
        MatButtonModule,
        MatIconModule,
    ],
    providers: [{ provide: LOCALE_ID, useValue: getCurentLocale() }],
    bootstrap: [AppComponent],
})
export class AppModule {}
