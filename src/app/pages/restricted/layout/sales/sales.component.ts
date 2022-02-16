import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilterFormComponent } from '@app/components/filter-form/filter-form.component';
import { ModalCreateVendaComponent } from '@app/components/modal-create-venda/modal-create-venda.component';
import { ControllerBase } from '@app/controller/controller.base';
import { MessageService } from '@app/services/message.service';
import { VendaService } from '@app/services/venda.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  create: any = {};

  totalVendas: number = 0;
  totalMensal: number = 0;
  recebido: number = 0;
  lucro: number = 0;
  
  term: string;

  constructor(
    private modalCtrl: NgbModal,
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
  
  filterDate() {
    const modalRef = this.modalCtrl.open(FilterFormComponent, { size: 'sm', backdrop: 'static' });
    modalRef.result.then(res => {
      if(res.date){
        this.filters.date = res.date;
        this.filters.app = true;
  
        this.loading = true;
        this.getAll();
      }
    })
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
    const modalRef = this.modalCtrl.open(ModalCreateVendaComponent, { size: 'md', backdrop: 'static' });
    modalRef.result.then(res => {
      if (res) { 
        this.createVenda({entrega_id: res});
      }
    })
  }

  createVenda(params: any) {
    this.loading = true;
    this.service.store(params).subscribe(res => {
      if(res.message) {
        this.message.toastError(res.message);
        this.loading = false;
        return false;
      };
      
      this.router.navigate([`/restricted/vendas/${res.id_venda}`]);
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
