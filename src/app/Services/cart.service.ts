import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICart } from '../interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // theo doi cap nhat gtri trong cart
  private cartItems: ICart[] = [];
  private CartItemSubject = new BehaviorSubject<ICart[]>([]);
  // cap nhat gtri cua cart de thong bao ra matBadge 
  private totalQuantitySubject = new BehaviorSubject<number>(0);
  totalQuantity$ = this.totalQuantitySubject.asObservable();

  constructor() {
    if (this.isLocalStorageAvailable()) {
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        this.cartItems = JSON.parse(storedCartItems);
      }
    }
    this.CartItemSubject.next(this.cartItems);
    this.calculateTotalQuantity();
  }

  // đảm bảo rằng localStorage chỉ được sử dụng khi chạy trong môi trường trình duyệt
  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorageTest__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  getItemCart() {
    return this.CartItemSubject.asObservable();
  }

  addItemToCart(product: ICart) {
    const existingProductIndex = this.cartItems.findIndex(
      (item) =>
        item.idHangHoa === product.idHangHoa &&
        item.mauSac === product.mauSac &&
        item.size === product.size
    );

    if (existingProductIndex !== -1) {
      this.cartItems[existingProductIndex].soLuong += product.soLuong;
    } else {
      this.cartItems.push(product);
    }

    this.CartItemSubject.next(this.cartItems);
    this.saveCartToLocalStorage();
    this.calculateTotalQuantity();
  }

  removeCartFormData(index: number) {
    this.cartItems.splice(index, 1);
    this.CartItemSubject.next(this.cartItems);
    this.saveCartToLocalStorage();
    this.calculateTotalQuantity();
  }

  inCrease(index: number) {
    const product = this.cartItems[index];
    if (product.soLuong < product.soLuong) {
      product.soLuong++;
      this.CartItemSubject.next(this.cartItems);
      this.saveCartToLocalStorage();
      this.calculateTotalQuantity();
    }
  }

  deCrease(index: number) {
    const product = this.cartItems[index];
    if (product.soLuong > 1) {
      product.soLuong--;
      this.CartItemSubject.next(this.cartItems);
      this.saveCartToLocalStorage();
      this.calculateTotalQuantity();
    }
  }

  // tinh tong so luong sp trong cart de tao thong báo
  calculateTotalQuantity() {
    const totalQuantity = this.cartItems.reduce((total, item) => total + item.soLuong, 0);
    this.totalQuantitySubject.next(totalQuantity);
  }

  saveCartToLocalStorage() {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }
}
