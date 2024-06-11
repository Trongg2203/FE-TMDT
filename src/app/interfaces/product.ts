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
    hinhAnh: {
        url:string;
    }
 }
export interface IProducts {
   HinhAnhs: IImage[];
   ratings:IRating[];
   products:IProduct[];
}