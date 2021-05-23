import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './effects/user.effects';
import { userReducer } from './reducers/user.reducer';

@NgModule({
    imports: [StoreModule.forFeature('user', userReducer), EffectsModule.forFeature([UserEffects])],
})
export class UserModule {}
