import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let componentInstance: AppComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                AppComponent
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        const fixture = TestBed.createComponent(AppComponent);
        componentInstance = fixture.componentInstance;
    });

    it('should create the app', () => {
        expect(componentInstance).toBeTruthy();
    });

    // it(`should have as title 'json-web-tool'`, () => {
    //     expect(app.title).toEqual('json-web-tool');
    // });

    // it('should render title', () => {
    //     const compiled = fixture.nativeElement;
    //     expect(compiled.querySelector('.content span').textContent).toContain('json-web-tool app is running!');
    // });
});
