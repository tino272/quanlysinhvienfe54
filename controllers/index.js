
var mangSinhVien = [];
var validate = new Validation();
//Định nghĩa sự kiện click khi người dùng bấm nút xác nhận
document.querySelector('#btnXacNhan').onclick = function () {
    //Tạo ra đối tượng sinh viên chứa thông tin người dùng nhập vào từ giao diện
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.email = document.querySelector('#email').value;
    sv.soDienThoai = document.querySelector('#soDienThoai').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    console.log('Sinh viên', sv);

    // kiểm tra hợp lệ ---------------------------------------

    // kiểm tra rỗng
   
    // .trim() : hàm js loại bỏ khoảng trống đầu và cuối của chuỗi
    // if (sv.maSinhVien.trim() === '') {
    //     // Dom đến thẻ lỗi kiemTraRong-maSinhVien => ghi nội dung lỗi vào innerHTML
    //     document.querySelector('.kiemTraRong-maSinhVien').innerHTML = 'Mã sinh viên không được bỏ trống';

    //     valid = false;
    // } else {
    //     document.querySelector('.kiemTraRong-maSinhVien').innerHTML = '';

    // }

    // if (sv.tenSinhVien.trim() === '') {
    //     document.querySelector('.kiemTraRong-tenSinhVien').innerHTML = 'Tên sinh viên không được bỏ trống';

    //     valid = false;
    // } else {
    //     document.querySelector('.kiemTraRong-tenSinhVien').innerHTML = '';

    // }

    // if (sv.email.trim() === '') {

    //     document.querySelector('.kiemTraRong-email').innerHTML = 'Email không được bỏ trống';

    //     valid = false;
    // } else {
    //     document.querySelector('.kiemTraRong-email  ').innerHTML = '';

    // }

    // if (sv.soDienThoai.trim() === '') {

    //     document.querySelector('.kiemTraRong-soDienThoai').innerHTML = 'Số điện thoại không được bỏ trống';

    //     valid = false;
    // } else {
    //     document.querySelector('.kiemTraRong-soDienThoai  ').innerHTML = '';

    // }

    // if (sv.diemToan.trim() === '') {

    //     document.querySelector('.kiemTraRong-diemToan').innerHTML = 'Điểm toán không được bỏ trống';

    //     valid = false;
    // } else {
    //     document.querySelector('.kiemTraRong-diemToan  ').innerHTML = '';

    // }


    // Kiểm tra rỗng
    var valid = true;

    valid = validate.kiemTraRong(sv.maSinhVien, 'Mã sinh viên', '.kiemTraRong-maSinhVien') & validate.kiemTraRong(sv.tenSinhVien, 'Tên sinh viên', '.kiemTraRong-tenSinhVien') & validate.kiemTraRong(sv.email, 'Email', '.kiemTraRong-email') & validate.kiemTraRong(sv.soDienThoai, 'Số điện thoại', '.kiemTraRong-soDienThoai') & validate.kiemTraRong(sv.diemToan,'Điểm toán','.kiemTraRong-diemToan')  & validate.kiemTraRong(sv.diemLy,'Điểm lý','.kiemTraRong-diemLy')  & validate.kiemTraRong(sv.diemHoa,'Điểm hóa','.kiemTraRong-diemHoa')  & validate.kiemTraRong(sv.diemRenLuyen,'Điểm rèn luyện','.kiemTraRong-diemRenLuyen') ;

    // Kiểm tra định dạng dữ liệu
    // kiểm tra định dạng email

    valid &= validate.kiemTraEmail(sv.email, 'Email', '.kiemTraDinhDang-email');

    // Kiểm tra định dạng tên
    valid &= validate.kiemTraTatCaKyTu(sv.tenSinhVien, 'Tên sinh viên', '.kiemTraDinhDang-tenSinhVien');

    // Kiểm tra số điện thoại
    valid &= validate.kiemTraTatCaLaSo(sv.soDienThoai, 'Số điện thoại', '.kiemTraDinhDang-soDienThoai') & validate.kiemTraTatCaLaSo(sv.diemToan,'Điểm toán', '.kiemTraDinhDang-diemToan') & validate.kiemTraTatCaLaSo(sv.diemLy,'Điểm lý', '.kiemTraDinhDang-diemLy') & validate.kiemTraTatCaLaSo(sv.diemHoa,'Điểm hóa', '.kiemTraDinhDang-diemHoa') & validate.kiemTraTatCaLaSo(sv.diemRenLuyen,'Điểm rèn luyện', '.kiemTraDinhDang-diemRenLuyen');

    // Kiểm tra điểm
    valid &= validate.kiemTraGiaTri(sv.diemToan, 'Điểm toán', '.kiemTraGiaTri-diemToan',0,10);
    valid &= validate.kiemTraGiaTri(sv.diemLy, 'Điểm lý', '.kiemTraGiaTri-diemLy',0,10);
    valid &= validate.kiemTraGiaTri(sv.diemHoa, 'Điểm hóa', '.kiemTraGiaTri-diemHoa',0,10);
    valid &= validate.kiemTraGiaTri(sv.diemRenLuyen, 'Điểm rèn luyện', '.kiemTraGiaTri-diemRenLuyen',0,10);

    // kiểm tra độ dài chuỗi
    valid &= validate.kiemTraDoDaiChuoi(sv.tenSinhVien,'Tên sinh viên', '.kiemTraDoDaiChuoi-tenSinhVien',6,50);
    valid &= validate.kiemTraDoDaiChuoi(sv.email,'Email', '.kiemTraDoDaiChuoi-email',6,32);


    if (!valid) {
        return;
    }


    //Thêm 1 sinh viên vào mảng
    mangSinhVien.push(sv);
    console.log('mảng sinh viên', mangSinhVien);


    // tạo bảng
    renderTable(mangSinhVien);

    // Lưu vào localstorage
    luuLocalStorage();



    // //Tạo thẻ tr sinh viên, Cú pháp tạo thẻ : document.createElement('tenThe');
    // var trSinhVien = document.createElement('tr');

    // //Tạo thẻ tdMaSinhVien => Chứa nội dung sv.maSinhVien
    // var tdMaSinhVien = document.createElement('td');
    // tdMaSinhVien.innerHTML = sv.maSinhVien;

    // //Tạo thẻ tdTenSinhVien
    // var tdTenSinhVien = document.createElement('td');
    // tdTenSinhVien.innerHTML = sv.tenSinhVien;

    // var tdEmail = document.createElement('td');
    // tdEmail.innerHTML = sv.email;
    // var tdSoDienThoai = document.createElement('td');
    // tdSoDienThoai.innerHTML = sv.soDienThoai;
    // var tdDiemTrungBinh = document.createElement('td');
    // tdDiemTrungBinh.innerHTML = sv.tinhDiemTrungBinh();
    // var tdXepLoai = document.createElement('td');
    // tdXepLoai.innerHTML = sv.xepLoai();

    // //Tạo ra td chức năng
    // var tdChucNang = document.createElement('td');

    // var buttonXoa = document.createElement('button');
    // buttonXoa.innerHTML = 'Xóa';
    // buttonXoa.className = 'btn btn-danger';
    // buttonXoa.onclick = function () {
    //     //this: là nút xóa
    //     //this vị trí hiện tại là thẻ button => .parentElement là thẻ td => td.parentElement =>thẻ tr => .remove() :xóa
    //     this.parentElement.parentElement.remove();
    // }

    // //Add button vào td
    // tdChucNang.appendChild(buttonXoa);
    // //Chèn thẻ con vào thẻ cha : theCha.appendChild(theCon)
    // trSinhVien.appendChild(tdMaSinhVien);
    // trSinhVien.appendChild(tdTenSinhVien);
    // trSinhVien.appendChild(tdEmail);
    // trSinhVien.appendChild(tdSoDienThoai);
    // trSinhVien.appendChild(tdDiemTrungBinh);
    // trSinhVien.appendChild(tdXepLoai);
    // trSinhVien.appendChild(tdChucNang);


    // //Dom đến thẻ tbody => appendChild thẻ tr vào
    // document.querySelector('#tableSinhVien').appendChild(trSinhVien);

}


var renderTable = function (arrSV) {
    //Từ mảng sinh viên tạo ra 1 chuỗi html nhiều thẻ tr dựa vào vòng lặp
    var noiDungTable = '';
    for (var index = 0; index < arrSV.length; index++) {
        //Mỗi lần lặp lấy ra 1 đối tượng sinhVien
        var sinhVien = arrSV[index];
        var sv = new SinhVien(sinhVien.maSinhVien,sinhVien.tenSinhVien,sinhVien.loaiSinhVien,sinhVien.email,sinhVien.soDienThoai,sinhVien.diemToan,sinhVien.diemLy,sinhVien.diemHoa,sinhVien.diemRenLuyen);
        // sv.maSinhVien = sinhVien.maSinhVien;
        // sv.tenSinhVien = sinhVien.tenSinhVien;
        // sv.email = sinhVien.email;
        // sv.soDienThoai = sinhVien.soDienThoai;
        // sv.diemToan = sinhVien.diemToan;
        // sv.diemLy = sinhVien.diemLy;
        // sv.diemHoa = sinhVien.diemHoa;
        // sv.diemRenLuyen = sinhVien.diemRenLuyen;
        // sv.loaiSinhVien = sinhVien.loaiSinhVien;
        //Tạo ra 1 chuỗi + dồn vào nội dung <tr></tr>
        noiDungTable += `
                <tr>
                    <td>${sv.maSinhVien}</td>
                    <td>${sv.tenSinhVien}</td>
                    <td>${sv.email}</td>
                    <td>${sv.soDienThoai}</td>
                    <td>${sv.tinhDiemTrungBinh()}</td>
                    <td>${sv.xepLoai()}</td>
                    <td><button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSinhVien}')">Xóa</button></td>
                    <td><button class="btn btn-primary" onclick="chinhSua('${sv.maSinhVien}')">Chỉnh Sửa </button></td>
                </tr>            
        `
    }
    console.log(noiDungTable);
    document.querySelector('#tableSinhVien').innerHTML = noiDungTable;
}
// cài đặt sự kiện cho nút button xóa
var xoaSinhVien = function (maSV) { 
    // alert(maSV);
    // mangSinhVien = [{ma:1,ten:'a'},{ma:2,ten:'b'}]
    for (var index =mangSinhVien.length -1; index >=0; index--) {
        // mỗi lần duyệt lấy ra 1 đối tượng sinh viên
        var sv = mangSinhVien[index];

        // lấy mã sinh viên của từng đối tượng so sánh với maSV được click
        if (sv.maSinhVien === maSV) {
            // splice là hàm xóa phần tử của mảng dựa vào index
            mangSinhVien.splice(index, 1);
        }
    }
    // sau khi xóa dữ liệu trong mảng gọi hàm tạo lại table  truyền vào mảng sinh viên dã xóa
    renderTable(mangSinhVien);
}

var chinhSua = function (maSV){
    document.querySelector('#maSinhVien').disabled = true;
   // alert(maSV); Từ mã sinh viên => tìm sinh viên trong mangSInhVien
   for (var index = 0; index < mangSinhVien.length; index++) {
       // Mỗi lần duyệt mảng lấy ra 1 đối tượng sinh viên
       var sv = mangSinhVien[index];

       // So sánh nếu maSv truyền vào === với đối tượng đang duyệt => gán ngược lại lên các control phía trên
       if(maSV === sv.maSinhVien) {
           document.querySelector('#maSinhVien').value = sv.maSinhVien;
           document.querySelector('#tenSinhVien').value = sv.tenSinhVien;
           document.querySelector('#loaiSinhVien').value = sv.loaiSinhVien;
           document.querySelector('#email').value = sv.email;
           document.querySelector('#soDienThoai').value = sv.soDienThoai;
           document.querySelector('#diemToan').value = sv.diemToan;
           document.querySelector('#diemLy').value = sv.diemLy;
           document.querySelector('#diemHoa').value = sv.diemHoa;
           document.querySelector('#diemRenLuyen').value = sv.diemRenLuyen;
       }
   }
}


// Viết hàm lưu trữ dữ liệu xuống máy tính client

var luuLocalStorage = function() {
    // Biến mảng sinh viên thành chuỗi
    var sMangSinhVien = JSON.stringify(mangSinhVien);
    // Đem chuỗi mangSinhVien lưu vào localstorage
    localStorage.setItem('mangSinhVien', sMangSinhVien);


}

// Viết phương thức lấy dữ liệu từ localstorage => khi người dùng vừa vào trang web

var layMangSinhVienStorage = function () {
    // Kiểm tra dữ liệu có trong localstorage không ?
    if(localStorage.getItem('mangSinhVien')) {
        // Lấy dữ liệu được lưu trong localstorage ra ngoài
        var sMangSinhVien = localStorage.getItem('mangSinhVien');
        // Biến dữ liệu từ chuỗi chuyển về object javascript gán vào mangSinhVien
        mangSinhVien = JSON.parse(sMangSinhVien);
        // Sau khi lấy dữ liệu ra gọi hàm tạo bảng
        renderTable(mangSinhVien);
    }
}

layMangSinhVienStorage();

