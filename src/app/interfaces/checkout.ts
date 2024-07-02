export interface IPostThongTinXuat {
  idXuatHangHoa: string;
  idHangHoa: number;
  soLuong: number;
  tongGia: number;
}

export interface IPostHoaDonXuat {
  idHoaDon: string;
  phone: string;
  diaChi: string;
  ghiChu: string;
  idUser: string;
}

export interface IOrderDetails {
  idXuatHangHoa: string;
  idHangHoa: number;
  soLuong: number;
  gia: number;
  tongGia: number;
}
