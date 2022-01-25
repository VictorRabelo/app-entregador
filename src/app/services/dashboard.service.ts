import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class DashboardService extends BaseService {

    urlApi: string;

    constructor(private http: HttpClient) {
        super();
    }

    setUrl(url: string): void {
        this.urlApi = url;
    }

    getVendasDia() {
        return this.http.get<any>(`${this.urlApi}/dashboard/vendas-dia`, { params: { app: 'true' } });
    }
    
    getVendasMes() {
        return this.http.get<any>(`${this.urlApi}/dashboard/vendas-mes`, { params: { app: 'true' } });
    }
    
    getVendasTotal() {
        return this.http.get<any>(`${this.urlApi}/dashboard/vendas-total`, { params: { app: 'true' } });
    }
    
    getTotalClientes() {
        return this.http.get<any>(`${this.urlApi}/dashboard/clientes-total`, { params: { app: 'true' } });
    }
    
    getProdutosEnviados() {
        return this.http.get<any>(`${this.urlApi}/dashboard/produtos-enviados`, { params: { app: 'true' } });
    }
    
    getProdutosCadastrados() {
        return this.http.get<any>(`${this.urlApi}/dashboard/produtos-cadastrados`, { params: { app: 'true' } });
    }
    
    getProdutosPagos() {
        return this.http.get<any>(`${this.urlApi}/dashboard/produtos-pagos`, { params: { app: 'true' } });
    }
    
    getProdutosEstoque() {
        return this.http.get<any>(`${this.urlApi}/dashboard/produtos-estoque`, { params: { app: 'true' } });
    }
    
    getProdutosVendidos() {
        return this.http.get<any>(`${this.urlApi}/dashboard/produtos-vendidos`, { params: { app: 'true' } });
    }
    
    getContasReceber() {
        return this.http.get<any>(`${this.urlApi}/dashboard/contas-receber`, { params: { app: 'true' } });
    }

}