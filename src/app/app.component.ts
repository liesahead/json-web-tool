import { Component } from '@angular/core';
import { APP_DARK_THEME_CLASS_NAME } from 'src/constants';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public toggleTheme(): void {
        document.documentElement.classList.toggle(APP_DARK_THEME_CLASS_NAME);
    }
}
