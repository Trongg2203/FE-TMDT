import exp from "constants";

export interface IImage {
    idHinhAnh: number;
    hinhAnh1:string;
    tenHinhAnh:string;
    idHangHoa:number;
}

export interface IRating {
    idRating:number;
    danhGia:string;
    idUser:string;
    soSao:number;
}
 export interface IProduct {
    idHangHoa:number;
    mauSac:string;
    soLuong:number;
    size:string;
    tenHangHoa:string;
    gia:number;
    moTa:string;
    hinhAnh:string;
    idLoaiHangHoa:number;
    tenLoai:string;
 }
export interface IProducts {
   HinhAnhs: IImage[];
   ratings:IRating[];
   products:IProduct[];
}

export interface IAddLoaiHangHoa{
    idLoaiHangHoa:number;
    tenLoai:string;
}

export interface IAddHangHoa{
    idHangHoa?:string;
    MauSac:string;
    SoLuong:number;
    Size:string;
    HinhAnh?:File;
    TenHoangHoa:string;
    Gia:number;
    MoTa:string;
    idLoaiHangHoa:number;
    tenLoai:string;
}
