import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';

import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ModalPessoalComponent } from './modal-pessoal/modal-pessoal.component';
import { ModalProductsComponent } from './modal-products/modal-products.component';
import { ModalProductDadosComponent } from './modal-product-dados/modal-product-dados.component';
import { ModalAlterPasswordComponent } from './modal-alter-password/modal-alter-password.component';

import { NgxMaskModule } from 'ngx-mask';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UtilModule } from '@app/util/util.module';

export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: false,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};

@NgModule({
  declarations: [
    ClienteFormComponent,
    ModalPessoalComponent,
    ModalProductsComponent,
    ModalProductDadosComponent,
    ModalAlterPasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    UtilModule,
    MatTabsModule,
    Ng2SearchPipeModule,
    MatStepperModule,
    NgxMaskModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
  ],
  exports:[
    ClienteFormComponent,
    ModalPessoalComponent,
    ModalProductsComponent,
    ModalProductDadosComponent,
    ModalAlterPasswordComponent,
  ],
  entryComponents: [
    ClienteFormComponent,
    ModalPessoalComponent,
    ModalProductsComponent,
    ModalProductDadosComponent,
    ModalAlterPasswordComponent,
  ],
})
export class ComponentsModule { }
