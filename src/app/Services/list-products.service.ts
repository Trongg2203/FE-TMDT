import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct, IProducts } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListProductsService {
  apiUrl:string = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getAllProducts():Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.apiUrl + "HangHoa/getall");
  }
  getProductById(idHangHoa:number):Observable<IProduct>{
    return this.http.get<IProduct>(this.apiUrl + "HangHoa/getbyid/" + idHangHoa);
  }
}
