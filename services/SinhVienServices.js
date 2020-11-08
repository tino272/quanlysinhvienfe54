// Lớp đối tượng chứa các phương thức giao tiếp với backend(api)
var SinhVienServices = function () {
    this.layThongTinSinhVien = function () {
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', // BE cung cấp
            method: 'GET' // BE cung cấp
        })
        return promise;
    }
    this.themSinhVien = function (sv) {
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien', // API backend cung cấp
            method: 'POST', // giao thức backend cung cấp
            data: sv // Dữ liệu gửi đi (Lưu ý : dữ liệu gửi đi phải đúng format dữ liệu của backend yêu cầu)
        });
        return promise;
    }
}