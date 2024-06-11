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
    mauSac:string;
    soLuong:number;
    size:string;
    hinhAnh:string;
    tenHangHoa:string;
    gia:number;
    moTa:string;
 }
export interface IProducts {
   HinhAnhs: IImage[];
   ratings:IRating[];
   products:IProduct[];
}