import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CateProductService {
  apiUrl:string = environment.apiUrl

  constructor(private http :HttpClient) { }

  getProductByCategories(idLoaihangHoa:number):Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl + "HangHoa/GetByIdCate/" + idLoaihangHoa);
  }
}
