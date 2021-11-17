//Khai báo biến toàn cục
var dsnd = new UserList();
var validation = new Validation();

//Khi trang vừa load thì chạy code bên trong hàm getLocalStorage
getLocalStorage();

//Hàm rút gọn cú pháp document.getElementById
function getELE(id) {
  return document.getElementById(id);
}

// Xử lý UI khi thêm nhân viên
getELE("btnThem").addEventListener("click", function () {
  //Xử lý button
  getELE("btnThemND").style.display = "block";
  getELE("btnCapNhat").style.display = "none";
  getELE("userId").removeAttribute("disabled");
  getELE("formNV").reset();
});
// getELE("btnThem").onclick=function(){
//     getELE("btnThemND").style.display = "block";
//     getELE("btnCapNhat").style.display = "block";
//     getELE("msnv").removeAttribute("disabled");
//     getELE("formNV").reset();
// }

//Gắn sự kiện click cho button Thêm Người Dùng
//btn.onclick = function(){}
//Khi gán hàm cho onclick không để dấu tròn (), để tránh hàm chạy khi trang vừa load
getELE("btnThemND").onclick = themNhanVien;

//Hàm lấy thông tin nhân viên, thêm nhân viên
//Khai báo hàm
function themNhanVien() {
  //lấy thông tin nhân viên
  var _userId = getELE("userId").value;
  var _userName = getELE("userName").value;
  var _userPhone = getELE("userPhone").value;
  var _userEmail = getELE("userEmail").value;
  var _userPassword = getELE("userPassword").value;
  var _userAddress = getELE("userAddress").value;
  var _userRole = getELE("userRole").value;

  console.log(
    _userId,
    _userName,
    _userPhone,
    _userEmail,
    _userPassword,
    _userAddress,
    _userRole
  );

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
  var nd = new User(
    _userId,
    _userName,
    _userPhone,
    _userEmail,
    _userPassword,
    _userAddress,
    _userRole
  );
  console.log(nd);
  dsnd.addUser(nd);
  console.log(dsnd.userArray);
  //Gọi hàm
  taoBang(dsnd.userArray);
  setLocalStorage();
  // }
}

//Khai báo hàm
function taoBang(mang) {
  var tbody = getELE("tableDanhSach");
  // content chứa các thẻ tr(mỗi tr chứa thông tin 1 nd)
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
                <td>${item.userId}</td>
                <td>${item.userName}</td>
                <td>${item.userEmail}</td>
                <td>${item.userPhone}</td>
                <td>${item.userAddress}</td>
                <td>${item.userRole}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaNguoiDung('${item.userId}')" >Xóa</button>
                    <button data-toggle="modal"
                    data-target="#myModal" class="btn btn-info" onclick="hienThiChiTiet('${item.userId}')" >Sửa</button>
                </td>
            </tr>
        `;
  });
  tbody.innerHTML = content;
}

//Hàm xóa nhân viên
//Khai báo hàm
function xoaNguoiDung(ma) {
  dsnd.deleteUser(ma);
  console.log("ok");
  taoBang(dsnd.userArray);
  setLocalStorage();
}
function hienThiChiTiet(ma) {
  //Lấy đối tượng nhân viên từ mảng
  var nd = dsnd.getDetail(ma);

  //Xử lý button
  getELE("btnThemND").style.display = "none";
  getELE("btnCapNhat").style.display = "block";

  //Điền thông tin nhân viên lên form
  getELE("userId").value = nd.userId;
  getELE("userId").disabled = "true";

  getELE("userName").value = nd.userName;
  getELE("userEmail").value = nd.userEmail;
  getELE("userPassword").value = nd.userPassword;
  getELE("userPhone").value = nd.userPhone;
  getELE("userAddress").value = nd.userAddress;
  getELE("userRole").value = nd.userRole;
}

getELE("btnCapNhat").onclick = capNhatNhanVien;
function capNhatNhanVien() {
  //lấy thông tin nhân viên
  var _userId = getELE("userId").value;
  var _userName = getELE("userName").value;
  var _userPhone = getELE("userPhone").value;
  var _userEmail = getELE("userEmail").value;
  var _userPassword = getELE("userPassword").value;
  var _userAddress = getELE("userAddress").value;
  var _userRole = getELE("userRole").value;

  //Tạo instance(thể hiện)
  var nd = new User(
    _userId,
    _userName,
    _userPhone,
    _userEmail,
    _userPassword,
    _userAddress,
    _userRole
  );
  console.log(nd);

  // Cap nhat nguoi dung
  dsnd.editUser(nd);
  taoBang(dsnd.userArray);
  setLocalStorage();
}

//Hàm lưu data xuống local storage (chỗ lưu trữ offline trong trình duyệt của người dùng)
//Khai báo hàm
function setLocalStorage() {
  //Lưu dữ liệu xuống LocalStorage
  //chỉ cho phép lưu trữ dữ liệu kiểu json
  //chuyển kiểu mảng sang kiểu json => dùng stringify của đối tương JSON
  localStorage.setItem("DSND", JSON.stringify(dsnd.userArray));
}
//Khai báo hàm
function getLocalStorage() {
  //Lấy dữ liệu từ localStorage
  // parse: chuyển json sang kiểu mảng
  //Kiểm tra localStorage
  if (localStorage.getItem("DSND") != null) {
    dsnd.userArray = JSON.parse(localStorage.getItem("DSND"));
    taoBang(dsnd.userArray);
  }
}

// C1: click button search rồi mới tìm kiếm
getELE("btnTimNV").addEventListener("click", function () {
  var chuoiTK = getELE("searchName").value;
  var mangTK = [];
  mangTK = dsnd.searchUser(chuoiTK);
  taoBang(mangTK);
});

//C2: gõ từ khóa vào input và search liền
getELE("searchName").addEventListener("keypress", function () {
  var chuoiTK = getELE("searchName").value;
  var mangTK = [];
  mangTK = dsnd.searchUser(chuoiTK);
  taoBang(mangTK);
});
