import { Component, Input, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MatIconModule } from '@angular/material/icon';
import { ListProductsService } from '../../Services/list-products.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IItemMenu } from '../../interfaces/itemMenu';
import { ItemMenuService } from '../../Services/item-menu.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    MatIconModule,
    ReactiveFormsModule,
    DropdownModule,
  ],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  // lay gia tri từ cha vào con
  @Input() productId!: number;
  visible: boolean = false;
  editForm!: FormGroup;
  selectedFile: File | null = null;
  loaiHangHoas: IItemMenu[] = [];
  updateSuccess: boolean = false; // cập nhật lại khi thành công

  constructor(
    private lisProductService: ListProductsService,
    private itemMenuService: ItemMenuService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.initialForm();
    this.handleGetLoaiHangHoa();
  }

  ngOnInit(): void {
    if (this.productId) {
      this.lisProductService.getProductById(this.productId).subscribe(
        (data: any) => {
          this.editForm.patchValue({
            TenHangHoa: data.tenHangHoa,
            moTa: data.moTa,
            gia: data.gia,
            size: data.size,
            mauSac: data.mauSac,
            soLuong: data.soLuong,
            idLoaiHangHoa: data.idLoaiHangHoa,
            tenLoai: data.tenLoai,
          });
        },
        (error) => {
          console.log('Failed to fetch product details: ' + error);
        }
      );
    } else {
      console.log('No product id provided');
    }
  }

  initialForm() {
    this.editForm = this.fb.group({
      TenHangHoa: ['', Validators.required],
      moTa: [''],
      gia: ['', [Validators.required, Validators.min(0)]],
      size: ['', Validators.required],
      mauSac: ['', Validators.required],
      soLuong: ['', Validators.required],
      idLoaiHangHoa: ['', Validators.required],
      tenLoai: [''],
    });
  }

  showDialog() {
    this.visible = true;
  }

  handleGetLoaiHangHoa() {
    this.itemMenuService.getAllLoaiHoangHoa().subscribe(
      (data) => {
        this.loaiHangHoas = data;
      },
      (error) => {
        this.toastr.error('Lỗi khi lấy danh sách loại hàng hóa');
        console.error('Error fetching loai hang hoa: ', error);
      }
    );
  }

  handleFileInput(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
  }

  handleEditProduct() {
    this.visible = false;
    if (this.editForm.valid) {
      const productId = this.productId;
      const productData = new FormData();
      productData.append('TenHangHoa', this.editForm.value.TenHangHoa);
      productData.append('moTa', this.editForm.value.moTa);
      productData.append('gia', this.editForm.value.gia);
      productData.append('size', this.editForm.value.size);
      productData.append('mauSac', this.editForm.value.mauSac);
      productData.append('soLuong', this.editForm.value.soLuong);
      productData.append('idLoaiHangHoa', this.editForm.value.idLoaiHangHoa);
      productData.append('tenLoai', this.editForm.value.tenLoai);
      if (this.selectedFile) {
        productData.append(
          'HinhAnh',
          this.selectedFile,
          this.selectedFile.name
        );
      }

      this.lisProductService
        .editHangHoaService(productId, productData)
        .subscribe(
          (response) => {
            this.toastr.success(
              'Sản phẩm đã được cập nhật thành công',
              'Thành công'
            );
            // Thực hiện các thao tác cần thiết sau khi cập nhật thành công
          },
          (error) => {
            this.toastr.error('Có lỗi xảy ra. Vui lòng thử lại sau', 'Lỗi');
            console.error('Error updating product:', error);
          }
        );
    } else {
      this.toastr.error('Vui lòng điền đầy đủ thông tin', 'Lỗi');
    }
  }

  
}
