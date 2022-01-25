import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';


@Injectable({ 
    providedIn: 'root' 
})
export class RelatorioService extends BaseService {
    
    urlApi: string;
  
    constructor(private http: HttpClient) { 
      super();
      this.currentUrl.subscribe(x => this.urlApi = x);
        
    }
  
    setUrl(url: string): void {
      this.urlApi = url;
    }

    getVendas() {
        return this.http.get<any>(`${this.urlApi}/relatorios/vendas`).pipe(map(res =>{ return res.response }));
    }

    getEntregas() {
        return this.http.get<any>(`${this.urlApi}/relatorios/entregas`).pipe(map(res =>{ return res.response }));
    }

    getEntregaDetalhes(id: number) {
        return this.http.get<any>(`${this.urlApi}/relatorios/entrega-detalhes/${id}`).pipe(map(res =>{ return res.response }));
    }

    getEstoque() {
        return this.http.get<any>(`${this.urlApi}/relatorios/estoque`).pipe(map(res =>{ return res.response }));
    }

    getVendidos() {
        return this.http.get<any>(`${this.urlApi}/relatorios/vendidos`).pipe(map(res =>{ return res.response }));
    }

    getClientes() {
        return this.http.get<any>(`${this.urlApi}/relatorios/clientes`).pipe(map(res =>{ return res.response }));
    }

}
