import { Routes } from '@angular/router';
import { LayoutComponent } from './modules/layout/components/layout/layout.component';

const childrenRoutes: Routes = [
    // { path: '', loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule) },
    // { path: '404', component: null }
];

export const routes: Routes = [
    { path: '', component: LayoutComponent, children: childrenRoutes },
    { path: '**', redirectTo: '/404' }
];

