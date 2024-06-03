import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IItemMenu } from '../interfaces/itemMenu';

@Injectable({
  providedIn: 'root'
})
export class ItemMenuService {

  //https://localhost:7294/api/LoaiHangHoa/getbyid?id=1
  apiUrl = 'https://localhost:7294/api/';
  //https://localhost:7294/api/LoaiHangHoa/getall
  constructor(private http: HttpClient) { }

  getAllLoaiHoangHoa(){
    return this.http.get<IItemMenu[]>(this.apiUrl + 'LoaiHangHoa/getall')
  }
}
