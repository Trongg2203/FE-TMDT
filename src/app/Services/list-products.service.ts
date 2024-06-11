import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct, IProducts } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListProductsService {
  apiUrl = 'https://localhost:7294/api/';
  // https://localhost:7294/api/HangHoa/getall
  // https://localhost:7294/api/HangHoa/getbyid/1
  constructor(private http:HttpClient) { }

  getAllProducts():Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.apiUrl + "HangHoa/getall");
  }
  getProductById(idHangHoa:number):Observable<IProduct>{
    return this.http.get<IProduct>(this.apiUrl + "HangHoa/getbyid/" + idHangHoa);
  }
}
