import { Component, Input } from '@angular/core';

@Component({
    selector: 'jwt-default-loader',
    templateUrl: './default-loader.component.html',
    styleUrls: ['./default-loader.component.scss'],
})
export class DefaultLoaderComponent {
    @Input() diameter: number = 120;
}
