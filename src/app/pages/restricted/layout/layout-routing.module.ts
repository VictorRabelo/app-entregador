import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesComponent } from './clientes/clientes.component';
import { UsersComponent } from './users/users.component';
import { EntregasComponent } from './entregas/entregas.component';
import { HomeComponent } from './home/home.component';
import { SalesComponent } from './sales/sales.component';
import { SaleDetalheComponent } from './sales/sale-detalhe/sale-detalhe.component';
import { EntregaDetalheComponent } from './entregas/entrega-detalhe/entrega-detalhe.component';
import { DespesasComponent } from './despesas/despesas.component';

const routes: Routes = [
  
  {path: '', pathMatch: 'full', redirectTo: 'home'},
      
  {path: 'home', component: HomeComponent, data: { animation: 'HomePage' }},

  {
    path: 'vendas', children: [
      { path: '', component: SalesComponent},
      { path: ':id', component: SaleDetalheComponent},
    ], data: { animation: 'VendasPage' }
  },

  {
    path: 'entregas', children: [
      { path: '', component: EntregasComponent},
      { path: ':id', component: EntregaDetalheComponent},
    ], data: { animation: 'EntregasPage' }
  },      
      
  {path: 'clientes', component: ClientesComponent, data: { animation: 'ClientesPage' }},

  {path: 'usuarios', component: UsersComponent, data: { animation: 'UsuariosPage' }},
  
  {path: 'despesas', component: DespesasComponent, data: { animation: 'DespesasPage' }},
];
  
@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
})
export class LayoutRoutingModule {}