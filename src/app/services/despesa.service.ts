import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';


@Injectable({ 
    providedIn: 'root' 
})
export class DespesaService extends BaseService {
    
    urlApi: string;

    constructor(private http: HttpClient) { 
        super();
        this.currentUrl.subscribe(x => this.urlApi = x);
    }

    setUrl(url: string): void {
        this.urlApi = url;
    }

    getAll(queryParams: any = {}) {
        return this.http.get<any>(`${this.urlApi}/despesas-entrega`, { params: queryParams });
    }
    
    getMovimentacao() {
        return this.http.get<any>(`${this.urlApi}/despesas-entrega/movimentacao`).pipe(map(res =>{ return res.entity }));
    }

    getById(id: number) {
        return this.http.get<any>(`${this.urlApi}/despesas-entrega/${id}`).pipe(map(res =>{ return res.entity }));
    }

    store(store: any){
        return this.http.post<any>(`${this.urlApi}/despesas-entrega`, store);
    }

    update(update: any){
        return this.http.put<any>(`${this.urlApi}/despesas-entrega/${update.id}`, update);
    }

    delete(id: number){
        return this.http.delete<any>(`${this.urlApi}/despesas-entrega/${id}`);
    }

}
