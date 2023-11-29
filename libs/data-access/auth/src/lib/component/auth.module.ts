import { NgModule } from '@angular/core';

import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
        { path: '', component: AuthComponent },
        { path: '**', redirectTo: '/not-found' },
    ]),
    AuthComponent,
],
})
export class AuthModule {}
