import { Component, OnInit } from '@angular/core';
import { ControllerBase } from '@app/controller/controller.base';
import { EntregaService } from '@app/services/entrega.service';
import { MessageService } from '@app/services/message.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-modal-create-venda',
  templateUrl: './modal-create-venda.component.html',
  styleUrls: ['./modal-create-venda.component.css']
})
export class ModalCreateVendaComponent extends ControllerBase {
  private sub = new SubSink();

  loading: boolean = false;
  
  dataSource: any[] = [];
  filters: any = { app: true, typeSearch: 'sales' };

  constructor(
    private service: EntregaService,
    private message: MessageService,
    private activeModal: NgbActiveModal

  ) { 
    super();
  }

  ngOnInit() {
    this.getItemAvailable();
  }

  close(params = undefined) {
    this.activeModal.close(params);
  }

  getItemAvailable() {
    this.loading = true;
    this.sub.sink = this.service.getAllProducts(this.filters).subscribe(res => {
      this.dataSource = res;
    }, error => {
      console.log(error)
      this.message.toastError(error.message);
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }
  
  selecionarEntrega(id) {
    this.close(id);
  }
}
