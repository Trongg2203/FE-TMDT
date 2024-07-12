import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { IAddHangHoa, IProduct } from '../../interfaces/product';
import { ListProductsService } from '../../Services/list-products.service';
import { ToastrService } from 'ngx-toastr';
import { IItemMenu } from '../../interfaces/itemMenu';
import { ItemMenuService } from '../../Services/item-menu.service';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MatIconModule } from '@angular/material/icon';
import { EditProductComponent } from "../../admin-components/edit-product/edit-product.component";

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    InputTextareaModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    CommonModule,
    ButtonModule,
    MatIconModule,
    EditProductComponent
],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent implements OnInit {
  hangHoaForm!: FormGroup;
  loaiHangHoas: IItemMenu[] = [];
  selectedFile: File | null = null;
  ListProduct: IProduct[] = [];
  //pagination
  paginatedAllProducts: any[] = [];
  page = 1 ;
  pageSize = 10;
  collectionSize = 0

  constructor(
    private fb: FormBuilder,
    private itemMenuService: ItemMenuService,
    private listProductService: ListProductsService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.initialHangHoaForm();
    this.handleGetLoaiHangHoa();
    this.handleGetAllHangHoa();
  }

  initialHangHoaForm() {
    this.hangHoaForm = this.fb.group({
      TenHangHoa: ['', Validators.required],
      Mota: [''],
      Gia: ['', [Validators.required, Validators.min(0)]],
      Size: ['', Validators.required],
      MauSac: ['', Validators.required],
      SoLuong: ['', Validators.required],
      idLoaiHangHoa: ['', Validators.required],
    });
  }

  handleOnSubmitHangHoa() {
    if (this.hangHoaForm.valid) {
      const formData = new FormData();
      Object.keys(this.hangHoaForm.value).forEach((key) => {
        formData.append(key, this.hangHoaForm.value[key]);
      });
      if (this.selectedFile) {
        formData.append('files', this.selectedFile, this.selectedFile.name);
      }

      this.listProductService.addHangHoaService(formData).subscribe(
        (data) => {
          this.toastr.success('Thêm hàng hóa thành công!');
          this.hangHoaForm.reset();
          this.selectedFile = null;
          // console.log('add ', data);
          this.handleGetAllHangHoa();
        },
        (error) => {
          if (error.error && typeof error.error === 'string') {
            this.toastr.error(error.error);
          } else {
            this.toastr.error('Thêm hàng hóa thất bại');
          }
          // console.log('errors ', error);
        }
      );
    } else {
      this.toastr.error('Vui lòng điền đầy đủ thông tin');
    }
  }

  handleRemoveHangHoa(idHangHoa:number){
    this.listProductService.removeHangHoaService(idHangHoa).subscribe(
      () =>{
        this.toastr.success('Xóa hàng hóa thành công!');
        this.handleGetAllHangHoa();
      },
      (error) =>{
        this.toastr.error('Xóa hàng hóa thất bại');
        // console.log("Error " +error);
      }
    )
  }
  
  handleGetAllHangHoa(){
    this.listProductService.getAllProducts().subscribe(
      (response) => {
        this.ListProduct = response
        // console.log("Product" , response)
        this.collectionSize = this.ListProduct.length;
        this.refreshProduct();
      },
      (error) => {
        this.toastr.error("Không tồn tại sản phẩm")
        // console.log("Error: " + error)
      }
    )
  }

  handleGetLoaiHangHoa() {
    this.itemMenuService.getAllLoaiHoangHoa().subscribe(
      (data) => {
        this.loaiHangHoas = data;
        // console.log("loai hang hoa ", this.loaiHangHoas)
      },
      (error) => {
        this.toastr.error('Lỗi khi lấy danh sách loại hàng hóa');
        console.error('Error fetching loai hang hoa: ', error);
      }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  refreshProduct() {
    this.paginatedAllProducts = this.ListProduct?.map((order,i) =>({id:i+1,...order}))
    .slice((this.page - 1) * this.pageSize,(this.page -1) * this.pageSize + this.pageSize)
  }
}
