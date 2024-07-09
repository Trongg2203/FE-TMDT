import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ListProductsService } from '../../Services/list-products.service';
import { ToastrService } from 'ngx-toastr';
import { ItemMenuService } from '../../Services/item-menu.service';
import { IItemMenu } from '../../interfaces/itemMenu';
import { MatIconModule } from '@angular/material/icon';
import { IAddLoaiHangHoa } from '../../interfaces/product';
@Component({
  selector: 'app-create-categories',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    TableModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './create-categories.component.html',
  styleUrl: './create-categories.component.scss',
})
export class CreateCategoriesComponent implements OnInit {
  loaiHangHoaForm!: FormGroup;
  loaiHangHoas: IItemMenu[] = [];
  constructor(
    private fb: FormBuilder,
    private loaiHangHoaService: ListProductsService,
    private itemLoaiHangHoaService: ItemMenuService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.initialFormLoaiHangHoa();
    this.handleGetLoaiHangHoa();
  }

  initialFormLoaiHangHoa() {
    this.loaiHangHoaForm = this.fb.group({
      tenLoai: [''],
    });
  }

  
  handleOnSubmit() {
    if (this.loaiHangHoaForm.valid) {
      this.loaiHangHoaService
        .addLoaiHangHoaService(this.loaiHangHoaForm.value)
        .subscribe(
          () => {
            this.toastr.success('Thêm loại thành công');
            this.handleGetLoaiHangHoa(); // Gọi lại API để lấy danh sách mới nhất
            this.loaiHangHoaForm.reset();
          },
          () => {
            this.toastr.error('Thêm loại hàng thất bại');
          }
        );
    }
  }

  handleGetLoaiHangHoa() {
    this.itemLoaiHangHoaService.getAllLoaiHoangHoa().subscribe(
      (data) => {
        this.loaiHangHoas = data;
      },
      (error) => {
        this.toastr.error('Lấy loại hàng hóa thất bại');
      }
    );
  }
  handleRemoveLoaiHangHoa(idLoaiHangHoa: number) {
    this.itemLoaiHangHoaService
      .removeLoaiHangHoaService(idLoaiHangHoa)
      .subscribe(
        () => {
          this.toastr.success('Xóa loại thành công');
          this.handleGetLoaiHangHoa();
        },
        (error) => {
          this.toastr.error('Xóa loại hàng hóa thất bại');
        }
      );
  }
}
