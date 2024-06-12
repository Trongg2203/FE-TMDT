import { HttpClient } from '@angular/common/http';
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
}
