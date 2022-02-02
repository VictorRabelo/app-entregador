import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  urlApi: string;

  constructor(private http: HttpClient) { 
    super()
    this.currentUrl.subscribe(x => this.urlApi = x);
  }

  setCurrentUrl(url: string): void {
    this.urlApi = url;
  }
  /**
  * Login
  * @param credentials
  */
  login(credentials: any) {
    return this.http.post<any>(`${this.urlApi}/oauth/login`, { login: credentials.login, password: credentials.password, app: credentials.app }).pipe(map(resp => { return resp.user }));
  }

  logout(): Promise<any> {
    return this.http.get(`${this.urlApi}/oauth/logout`).toPromise();
  }

  async getUserByToken(queryParams: any = {}): Promise<any> {
    return await this.http.get(`${this.urlApi}/oauth/me`, { params: queryParams }).toPromise();
  }

  alterSenha(dados) {
    return this.http.post<any>(`${this.urlApi}/oauth/alter-password`, dados);
  }
}