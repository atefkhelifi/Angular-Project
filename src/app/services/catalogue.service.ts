import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  public host:string="http://localhost:8081"

  constructor(private httpClient:HttpClient) { }

  public getProducts(page:number,size:number){
    return this.httpClient.get(this.host+"/produits?page="+page+"&size="+size);
  }
  public getProductsByKeyword(mc:string,page:number,size:number){
    return this.httpClient.get(this.host+"/produits/search/byDesignationPage?mc="+mc+"&page="+page+"&size="+size);
  }
  public deleteRecouce(url){
    return this.httpClient.delete(url);
  }
  public saveRecsource(url,value):Observable<any>{
    return this.httpClient.post(url,value);
  }
  public getRecsource(url):Observable<any>{
    return this.httpClient.get(url);
  }
  public updateRecsource(url,value){
    return this.httpClient.put(url,value);
  }
}
