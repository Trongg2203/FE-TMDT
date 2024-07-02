export interface IOrderDetailRequest {
    idXuatHangHoa: "",
    idHangHoa: 0,
    soLuong: 0,
    tongGia: 0,
    gia: 0,
    idKhuyenMai: null
}

export interface IOrderRequest {
    idXuatHangHoa:string;
    phone :string;
    diaChi :string;
    ghiChu :string;
    idUser :string;
}
export interface OrderDetailRequest {
  idXuatHangHoa : string;
  idHangHoa : number;
  idKhuyenMai : number | null;
  soLuong : number;
  gia : number;
  tongGia : number;

}