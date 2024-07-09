import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IItemMenu } from '../interfaces/itemMenu';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemMenuService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAllLoaiHoangHoa() {
    return this.http.get<IItemMenu[]>(this.apiUrl + 'LoaiHangHoa/getall');
  }

  //admin remove

  removeLoaiHangHoaService(idLoaiHangHoa: number) {
    const params = new HttpParams().set("id",idLoaiHangHoa)
    const headers = new HttpHeaders().set('Cache-Control', 'no-cache')
    return this.http.delete(`${this.apiUrl}LoaiHangHoa/delete`, {params, headers});
  }

  // https://localhost:7294/api/LoaiHangHoa/delete?id=11
}
