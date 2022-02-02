import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class EntregaService extends BaseService {
    
    urlApi: string;

    
    constructor(private http: HttpClient) { 
        super();
        this.currentUrl.subscribe(x => this.urlApi = x);
    }

    setUrl(url: string): void {
        this.urlApi = url;
    }

    getAll(queryParams: any = {}) {
        return this.http.get<any>(`${this.urlApi}/entregas`, { params: queryParams }).pipe(map(res =>{ return res.response }));
    }
    
    getAllProducts(queryParams: any = {}) {
        return this.http.get<any>(`${this.urlApi}/entregas`, { params: queryParams }).pipe(map(res =>{ return res.response }));
    }

    getById(id: number) {
        return this.http.get<any>(`${this.urlApi}/entregas/${id}`);
    }
    
    update(id: number, update: any) {
        return this.http.put<any>(`${this.urlApi}/entregas/${id}`, update);
    }

    baixaEntrega(id: number, dados: any) {
        return this.http.put<any>(`${this.urlApi}/entregas/${id}/dar-baixa`, dados);
    }

    store(store: any){
        return this.http.post<any>(`${this.urlApi}/entregas`, store).pipe(map(res =>{ return res.response }));
    }

    finishEntrega(dados: any) {
        return this.http.post<any>(`${this.urlApi}/entregas/finish`, dados);
    }

    delete(id: number){
        return this.http.delete<any>(`${this.urlApi}/entregas/${id}`);
    }
    
    //itens
    getAllItem(params: any) {
        return this.http.get<any>(`${this.urlApi}/entregas/item`, { params: {...params} });
    }
    
    createItem(dados: any) {
        return this.http.post<any>(`${this.urlApi}/entregas/item`, dados);
    }
    getItemById(id) {
        return this.http.get<any>(`${this.urlApi}/entregas/item/${id}`);
    }
    updateItem(id, dados) {
        return this.http.put<any>(`${this.urlApi}/entregas/item/${id}`, dados);
    }
    deleteItem(id) {
        return this.http.delete<any>(`${this.urlApi}/entregas/item/${id}`);
    }
}
