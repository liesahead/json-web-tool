import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface JwtResolveContext {
    jwtResolve: any;
}

/* Based on:
 * https://medium.com/@AustinMatherne/angular-let-directive-a168d4248138
 * https://github.com/angular/angular/blob/4.4.4/packages/common/src/directives/ng_if.ts
 */
@Directive({
    selector: '[jwtResolve]',
})
export class JwtResolveDirective {
    private _context: JwtResolveContext = { jwtResolve: null };

    @Input()
    set jwtResolve(value: any) {
        this._context.jwtResolve = value;
    }

    public constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef<JwtResolveContext>) {
        viewContainer.createEmbeddedView(templateRef, this._context);
    }
}
