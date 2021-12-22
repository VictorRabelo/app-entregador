import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  public baseUrlCDI: string = environment.apiUrlCDI;
  public baseUrlLTGO: string = environment.apiUrlLTGO;

  constructor(public http: HttpClient) { }
}