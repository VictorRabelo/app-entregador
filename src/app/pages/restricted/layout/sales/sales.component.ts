import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ControllerBase } from '@app/controller/controller.base';
import { MessageService } from '@app/services/message.service';
import { VendaService } from '@app/services/venda.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent extends ControllerBase {
  private sub = new SubSink();
  public today: number = Date.now();

  dataSource: any[] = [];

  loading: boolean = false;

  filters: any = { date: '', app: true, typeApi: '' };

  totalVendas: number = 0;
  totalMensal: number = 0;
  recebido: number = 0;
  lucro: number = 0;
  
  term: string;

  constructor(
    private router: Router,
    private service: VendaService,
    private message: MessageService,
    private spinner: NgxSpinnerService,
  ) { 
    super();
    service.setUrl(this.getUrlCurrent());
  }

  ngOnInit(): void {
    this.getStart();
  }

  getStart(){
    this.loading = true;
    this.getAll();
  }
  
  getAll() {
    this.sub.sink = this.service.getAll(this.filters).subscribe(res => {
      this.dataSource = res.vendas;
      this.totalVendas = res.totalVendas;
      this.totalMensal = res.totalMensal;
      this.recebido = res.pago;
      this.lucro = res.lucro;
      this.today = res.data;
      this.filters.date = res.mounth;

    },error =>{
      
      this.loading = false;
      this.message.toastError(error.message);
      console.log(error);

    },()=> {
      this.loading = false;
    });
  }

  add() {
    this.message.swal.fire({
      title: 'Iniciar nova venda?',
      icon: 'question',
      inputLabel: 'Selecione a empresa',
      input: 'radio',
      inputOptions: {
        'cdi': 'CDIGO',
        'ltgo': 'LTGO',
      },
      inputValidator: (value) => {
        if (!value) {
          return 'É necessário selecionar uma empresa.'
        }
      },
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Voltar',
      showCancelButton: true
    }).then(res => {
      
      this.filters.typeApi = res.value;
      
      if (res.isConfirmed) {
        this.createVenda(this.filters);
      }
    })
  }

  createVenda(params) {
    this.loading = true;
    this.service.store(params).subscribe(res => {
      this.router.navigate([`/restricted/vendas/${res.id_venda}`],{ queryParams: { typeApi: res.typeApi } });
    }, error =>{
      this.loading = false;
      this.message.toastError(error.message)
      console.log(error)
    })
  }

  editVenda(id) {
    this.router.navigate([`/restricted/vendas/${id}`]);
  }

  deleteConfirm(item) {
    this.message.swal.fire({
      title: 'Atenção!',
      icon: 'warning',
      html: `Deseja excluir essa venda ?`,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Voltar',
      showCancelButton: true
    }).then(res => {
      if (res.isConfirmed) {
        this.delete(item);
      }
    })
  }

  delete(id){
    this.loading = true;
    this.spinner.show();

    this.service.delete(id).subscribe(res => {
      if (res.message) {
        this.message.toastSuccess(res.message)
      }
      this.getAll();
    },error =>{
      this.loading = false;
      this.message.toastError(error.message)
      console.log(error)
    }, () => {
      this.spinner.hide();
    });
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
