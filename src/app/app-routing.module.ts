import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BanksComponent } from './banks/banks.component';
import { MortageComponent } from './mortage/mortage.component';

const routes: Routes = [
  {path : '' , component : BanksComponent},
  {path: 'mortage',component : MortageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
