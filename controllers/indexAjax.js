console.log(axios);

// Kết nối dữ liệu backend dựa vào thư viện axios
var svService = new SinhVienServices();

var layDanhSachSinhVienApi = function () {
    // Tạo ra 1 object chứa các thuộc tính backend yêu cầu(url,method)

    // var objectAjax = {
    //     url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', // BE cung cấp
    //     method: 'GET' // BE cung cấp
    var promise = svService.layThongTinSinhVien(); // gọi đến backend lấy data
    

    // var promise = axios(objectAjax); // gọi đến backend lấy data

    // xử lý cho trường hợp gọi thành công
    promise.then(function (result) {
        console.log('kết quả', result.data);
        // Lấy dữ liệu server trả về gọi hàm tạo bảng table
        renderTable(result.data);
    });

    // xử lý chp trường hợp thất bại
    promise.catch(function (error) {
        console.log(error);
    })
}

var renderTable = function (mangSinhVien) {
    var noiDungTable = '';
    for (var i = 0; i < mangSinhVien.length; i++) {
        // Từ dữ liệu API  tạo đối tượng lưu trữ

        var sv = new SinhVien();
        sv.maSinhVien = mangSinhVien[i].maSinhVien;
        sv.tenSinhVien = mangSinhVien[i].tenSinhVien;
        sv.diemToan = mangSinhVien[i].diemToan;
        sv.diemLy = mangSinhVien[i].diemLy;
        sv.diemHoa = mangSinhVien[i].diemHoa;
        sv.diemRenLuyen = mangSinhVien[i].diemRenLuyen;
        sv.loaiSinhVien = mangSinhVien[i].loaiSinhVien;
        sv.email = mangSinhVien[i].email;
        // Tạo các tr chứa thông tin sinh viên tương ứng
        noiDungTable += `
            <tr>
                <td>${sv.maSinhVien}</td>
                <td>${sv.tenSinhVien}</td>
                <td>${sv.email}</td>
                <td>${sv.tinhDiemTrungBinh()}</td>
                <td>${sv.xepLoai()}</td>
                <td>
                    <button class='btn btn-danger' onclick = "xoaSinhVien('${sv.maSinhVien}')">Xóa</button>
                    <button class='btn btn-primary'onclick = "suaSinhVien('${sv.maSinhVien}')">Chỉnh sửa</button>
                </td>
            </tr>
        `;
    }
    document.querySelector('#tableSinhVien').innerHTML = noiDungTable;
}
layDanhSachSinhVienApi();
// Chức nắng thêm sinh viên lưu trữ vào server thông qua api backend
document.querySelector('#btnXacNhan').onclick = function () {
    // Lấy dữ liệu từ người dùng nhập vào
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sv.email = document.querySelector('#email').value;
    console.log(sv);
    // Dùng axios đưa dữ liệu về server thông qua API backend cung cấp
    // var promise = axios({
    //     url: 'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien', // API backend cung cấp
    //     method: 'POST', // giao thức backend cung cấp
    //     data: sv // Dữ liệu gửi đi (Lưu ý : dữ liệu gửi đi phải đúng format dữ liệu của backend yêu cầu)
    // });
    var promise = svService.themSinhVien(sv);

    // Hàm thực thi khi gọi ajax thành công
    promise.then(function (result) {
        console.log(result.data);

        // location.reload();
        // Gọi phương thức lấy thông tin sinh viên tạo lại table mới
        layDanhSachSinhVienApi();
    })

    // Hàm thực thi khi lỗi xảy ra
    promise.then(function (error) {
        console.log(error.response.data);
    })
}
// Chức năng xóa sinh viên server dựa vào api backend 
var xoaSinhVien = function (maSinhVien) {
    // alert(maSinhVien);
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=' + maSinhVien,
        method: 'DELETE',
    })
    // Hàm xử lý thành công
    promise.then(function (result) {
        console.log(result.data);
        layDanhSachSinhVienApi();
    })
    // Hàm xử lý thất bại
    promise.catch(function (error) {
        console.log(error.response.data);
    })
}

// sửa sinh viên

var suaSinhVien = function (maSinhVien) {
    // alert(maSinhVien);
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=' + maSinhVien,
        method: 'GET'
    });
    promise.then(function (result) {
        var sv = result.data;
        // Gán dữ liệu server trả về lên giao diện người dùng nhập thông tin
        document.querySelector('#maSinhVien').value = sv.maSinhVien;
        document.querySelector('#tenSinhVien').value = sv.tenSinhVien;
        document.querySelector('#loaiSinhVien').value = sv.loaiSinhVien;
        document.querySelector('#email').value = sv.email;
        document.querySelector('#diemToan').value = sv.diemToan;
        document.querySelector('#diemLy').value = sv.diemLy;
        document.querySelector('#diemHoa').value = sv.diemHoa;
        document.querySelector('#diemRenLuyen').value = sv.diemRenLuyen;
    });
    promise.catch(function (error) {
        console.log(error.response.data);
    })
}

// CHỨC NĂNG LƯU THÔNG TIN SINH VIÊN 

document.querySelector('#btnLuuThongTin').onclick = function () {
    // lấy dữ liệu người dùng nhập đưa vào đối tượng theo format dữ liệu của backend yêu cầu
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sv.email = document.querySelector('#email').value;
    // Gọi ajax đưa dữ liệu về server cập nhật
    var promise = axios ({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=' + sv.maSinhVien,
        method: 'PUT',
        data:sv
    })
    promise.then(function(result) {
        console.log(result.data);
        layDanhSachSinhVienApi();
    });
    promise.catch(function(error) {
        console.log(error.response.data);
    })
}