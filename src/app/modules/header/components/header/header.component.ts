import { Component } from '@angular/core';
import { APP_DARK_THEME_CLASS_NAME } from 'src/constants';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    public toggleTheme(): void {
        // TODO: move execution to ngrx effects
        document.documentElement.classList.toggle(APP_DARK_THEME_CLASS_NAME);
    }
}
