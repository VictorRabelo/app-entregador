import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FilterFormComponent } from '@app/components/filter-form/filter-form.component';

import { ControllerBase } from '@app/controller/controller.base';
import { DespesaService } from '@app/services/despesa.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MessageService } from 'primeng/api';

import { SubSink } from 'subsink';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.css'],
  providers: [ MessageService ]
})
export class DespesasComponent extends ControllerBase {

  private sub = new SubSink();

  loading: Boolean = false;
  loadingCreate: Boolean = false;

  term: string;
  despesas: any[] = [];

  saldo: number = 0;
  
  filters: any = { date: '' };

  constructor(
    private modalCtrl: NgbModal,
    private messageService: MessageService, 
    private despesaService: DespesaService
  ) { 
    super();
    despesaService.setUrl(this.getUrlCurrent());
  }

  ngOnInit() {
    this.loading = true;
    this.getAll();
  }
 
  filterDate() {
    const modalRef = this.modalCtrl.open(FilterFormComponent, { size: 'sm', backdrop: 'static' });
    modalRef.result.then(res => {
      if(res.date){
        this.filters.date = res.date;
  
        this.loading = true;
        this.getAll();
      }
    })
  }

  getAll(){
    this.sub.sink = this.despesaService.getAll(this.filters).subscribe(
      (res: any) => {
        this.loading = false;
        this.despesas = res.response;
        this.saldo = res.saldo;
        
      },error => {
        console.log(error)
        this.messageService.add({key: 'bc', severity:'error', summary: 'Erro 500', detail: error});
        this.loading = false;
      })
  }

  onSubmit(form: NgForm){
    
    this.loadingCreate = true;

    if (!form.valid) {
      this.loadingCreate = false;
      return;
    }

    this.despesaService.store(form.value).subscribe(
      (res: any) => {
        this.loading = true;
        this.getAll();
      },
      error => {
        console.log(error)
        this.messageService.add({key: 'bc', severity:'error', summary: 'Erro 500', detail: error});
        this.loadingCreate = false;
      },
      () => {
        this.messageService.add({key: 'bc', severity:'success', summary: 'Sucesso', detail: 'Cadastrado com Sucesso!'});
        this.loadingCreate = false;
        form.reset();
      }
    )
  }

  delete(id){
    
    this.loading = true;

    this.despesaService.delete(id).subscribe(
      (res: any) => {
        this.loading = true;
        this.getAll();
      },
      error => console.log(error),
      () => {
        this.messageService.add({key: 'bc', severity:'success', summary: 'Sucesso', detail: 'Excluido com Sucesso!'});
        this.loading = false;
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
