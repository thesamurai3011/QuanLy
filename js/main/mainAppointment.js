//Khai báo biến toàn cục
var dslh = new AppointmentList();
var validation = new Validation();

//Khi trang vừa load thì chạy code bên trong hàm getLocalStorage
getLocalStorage();

//Hàm rút gọn cú pháp document.getElementById
function getELE(id) {
  return document.getElementById(id);
}

// Xử lý UI khi thêm nhân viên
getELE("btnAddAppointment").addEventListener("click", function () {
  //Xử lý button
  getELE("btnThemLh").style.display = "block";
  getELE("btnCapNhat").style.display = "none";
  getELE("appointmentId").removeAttribute("disabled");
  getELE("formLh").reset();
});

//btn.onclick = function(){}
//Khi gán hàm cho onclick không để dấu tròn (), để tránh hàm chạy khi trang vừa load
getELE("btnThemLh").onclick = themLichHen;

//Khai báo hàm
function themLichHen() {
  //lấy thông tin lich hen
  var _aId = getELE("appointmentId").value;
  var _uId = getELE("userId").value;
  var _aState = getELE("appointmentState").value;
  var _aDate = getELE("datepicker").value;

  console.log(_aId, _uId, _aState, _aDate);

  // var isValid = true;

  //& : cộng chuỗi bit
  // true: 1
  //false: 0
  // 1 & 0 => 0 (false)
  // 1 & 1 => 1 (true)
  //kiểm tra mã số (mã không được để trống, mã không được trùng)
  // isValid(mới) = isValid(cũ) & validation.kiemTraRong(_userId,"tbUserId","Mã nhân viên không được để trống");
  // isValid &=
  //   validation.kiemTraRong(_userId, "tbUserId", "Mã số không được để trống") &&
  //   validation.kiemTraMaTrung(
  //     dsnd.userArray,
  //     _userId,
  //     "tbUserId",
  //     "Mã số bị trùng"
  //   );

  //kiểm tra tên nhân viên
  // isValid &=
  //   validation.kiemTraRong(
  //     _userName,
  //     "tbUserName",
  //     "Tên không được để trống"
  //   ) &&
  //   validation.kiemTraTen(_userName, "tbUserName", "Tên phải là ký tự chữ");

  //Kiểm tra email
  // isValid &=
  //   validation.kiemTraRong(_userEmail, "tbUserEmail", "Email không để trống") &&
  //   validation.kiemTraEmail(
  //     _userEmail,
  //     "tbUserEmail",
  //     "Email không đúng format"
  //   );

  //Kiểm tra password
  // isValid &=
  //   validation.kiemTraRong(
  //     _userPassword,
  //     "tnUserPassword",
  //     "Mật khẩu không để trống"
  //   ) &&
  //   validation.kiemTraDoDai(
  //     _userPassword,
  //     "tnUserPassword",
  //     "Mật khẩu có độ dài từ 6 - 8",
  //     6,
  //     8
  //   );

  //Kiểm tra ngày làm
  // isValid &= validation.kiemTraRong(
  //   _userAddress,
  //   "tbNgay",
  //   "Ngày làm không được để trống"
  // );

  //Kiểm tra chức vụ
  // isValid &= validation.kiemTraChucVu(
  //   "chucvu",
  //   "tbChucVu",
  //   "Chức vụ phải được chọn"
  // );

  // isValid == true
  // if (isValid) {
  //Tạo instance(thể hiện)
  var lh = new Appointment(_aId, _uId, _aState, _aDate);
  console.log(lh);
  dslh.addAppointment(lh);
  console.log(dslh.appointmentArray);
  //Gọi hàm
  taoBang(dslh.appointmentArray);
  setLocalStorage();
  // }
}

//Khai báo hàm
function taoBang(mang) {
  var tbody = getELE("tableDanhSach");
  // content chứa các thẻ tr(mỗi tr chứa thông tin 1 lich hen)
  var content = "";
  // map: giúp duyệt mảng (ES6)
  //reduce: ES6
  // for: cú pháp dài, tốc độ duyệt mảng nhanh (ES5)
  //forEach (ES5)

  mang.map(function (item, index) {
    //item đại diện cho 1 phần tử trong mảng
    //item chính là 1 nd
    // content = `tr mới` + content(chứa các tr trước đó)
    content += `
            <tr>
                <td>${item.aId}</td>
                <td>${item.aDate}</td>
                <td>${item.uId}</td>
                <td>${item.aState}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaLichHen('${item.aId}')" >Xóa</button>
                    <button data-toggle="modal"
                    data-target="#myModal" class="btn btn-info" onclick="hienThiChiTiet('${item.aId}')" >Sửa</button>
                </td>
            </tr>
        `;
  });
  tbody.innerHTML = content;
}

//Hàm xóa nhân viên
//Khai báo hàm
function xoaLichHen(ma) {
  dslh.deleteAppointment(ma);
  console.log("ok");
  taoBang(dslh.appointmentArray);
  setLocalStorage();
}
function hienThiChiTiet(ma) {
  //Lấy đối tượng nhân viên từ mảng
  var lh = dslh.getDetail(ma);

  //Xử lý button
  getELE("btnThemLh").style.display = "none";
  getELE("btnCapNhat").style.display = "block";

  //Điền thông tin tin tuc lên form
  getELE("appointmentId").value = lh.aId;
  getELE("appointmentId").disabled = "true";

  getELE("userId").value = lh.uId;
  getELE("appointmentState").value = lh.aState;
  getELE("datepicker").value = lh.aDate;
}

getELE("btnCapNhat").onclick = capNhatLichHen;
function capNhatLichHen() {
  //lấy thông tin nhân viên
  var _aId = getELE("appointmentId").value;
  var _uId = getELE("userId").value;
  var _aState = getELE("appointmentState").value;
  var _aDate = getELE("datepicker").value;

  //Tạo instance(thể hiện)
  var lh = new Appointment(_aId, _uId, _aState, _aDate);
  console.log(lh);
  // Cap nhat nguoi dung
  dslh.editAppointment(lh);
  taoBang(dslh.appointmentArray);
  setLocalStorage();
}

//Hàm lưu data xuống local storage (chỗ lưu trữ offline trong trình duyệt của người dùng)
//Khai báo hàm
function setLocalStorage() {
  //Lưu dữ liệu xuống LocalStorage
  //chỉ cho phép lưu trữ dữ liệu kiểu json
  //chuyển kiểu mảng sang kiểu json => dùng stringify của đối tương JSON
  localStorage.setItem("DSLH", JSON.stringify(dslh.appointmentArray));
}
//Khai báo hàm
function getLocalStorage() {
  //Lấy dữ liệu từ localStorage
  // parse: chuyển json sang kiểu mảng
  //Kiểm tra localStorage
  if (localStorage.getItem("DSLH") != null) {
    dslh.appointmentArray = JSON.parse(localStorage.getItem("DSLH"));
    taoBang(dslh.appointmentArray);
  }
}
