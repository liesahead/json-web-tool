import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtResolveDirective } from './directives/jwt-resolve.directive';

@NgModule({
    declarations: [JwtResolveDirective],
    exports: [JwtResolveDirective],
    imports: [CommonModule],
})
export class JwtResolveModule {}
