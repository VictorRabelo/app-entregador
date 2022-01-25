import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class VendaService extends BaseService{
    
    urlApi: string;
    
    constructor(private http: HttpClient) { 
        super();
    }

    setUrl(url: string): void {
        this.urlApi = url;
    }

    getAll(queryParams: any = {}) {
        let params = new HttpParams().set('app', queryParams.app);
        
        if(queryParams.date !== ''){
            params = new HttpParams().append('date', queryParams.date);
        }
        
        if(queryParams.typeApi !== ''){
            params = new HttpParams().append('typeApi', queryParams.typeApi);
        }

        return this.http.get<any>(`${this.urlApi}/vendas`, { params: params }).pipe(map(res =>{ return res.response }));
    }

    getById(id: number) {
        return this.http.get<any>(`${this.urlApi}/vendas/${id}`);
    }

    store(store: any){
        return this.http.post<any>(`${this.urlApi}/vendas`, store).pipe(map(res =>{ return res.response }));
    }

    finishSale(dados: any) {
        return this.http.post<any>(`${this.urlApi}/vendas/finish`, dados);
    }

    update(id: number, update: any) {
        return this.http.put<any>(`${this.urlApi}/vendas/${id}`, update);
    }

    delete(id: number){
        return this.http.delete<any>(`${this.urlApi}/vendas/${id}`);
    }
    
    //itens
    createItem(dados: any) {
        return this.http.post<any>(`${this.urlApi}/vendas/item`, dados);
    }
    getItemById(id) {
        return this.http.get<any>(`${this.urlApi}/vendas/item/${id}`);
    }
    updateItem(id, dados) {
        return this.http.put<any>(`${this.urlApi}/vendas/item/${id}`, dados);
    }
    deleteItem(id) {
        return this.http.delete<any>(`${this.urlApi}/vendas/item/${id}`);
    }
}
