//Khai báo biến toàn cục
var dstt = new NewsList();
var validation = new Validation();

//Khi trang vừa load thì chạy code bên trong hàm getLocalStorage
getLocalStorage();

//Hàm rút gọn cú pháp document.getElementById
function getELE(id) {
  return document.getElementById(id);
}

// Xử lý UI khi thêm nhân viên
getELE("btnAddNews").addEventListener("click", function () {
  //Xử lý button
  getELE("btnThemTt").style.display = "block";
  getELE("btnCapNhat").style.display = "none";
  getELE("newsId").removeAttribute("disabled");
  getELE("formTt").reset();
});

//btn.onclick = function(){}
//Khi gán hàm cho onclick không để dấu tròn (), để tránh hàm chạy khi trang vừa load
getELE("btnThemTt").onclick = themTinTuc;

//Khai báo hàm
function themTinTuc() {
  //lấy thông tin tin tuc
  var _nId = getELE("newsId").value;
  var _nName = getELE("newsName").value;
  var _nDescription = getELE("newsDescription").value;
  var _nDetail = getELE("newsDetail").value;
  var _nImage = getELE("newsImage").value;

  console.log(_nId, _nName, _nDescription, _nDetail, _nImage);

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
  var tt = new News(_nId, _nName, _nDescription, _nDetail, _nImage);
  console.log(tt);
  dstt.addNews(tt);
  console.log(dstt.newsArray);
  //Gọi hàm
  taoBang(dstt.newsArray);
  setLocalStorage();
  // }
}

//Khai báo hàm
function taoBang(mang) {
  var tbody = getELE("tableDanhSach");
  // content chứa các thẻ tr(mỗi tr chứa thông tin 1 tin tuc)
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
                <td>${item.nId}</td>
                <td>${item.nName}</td>
                <td>${item.nDescription}</td>
                <td>${item.nDetail}</td>
                <td>${item.nImage}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaTinTuc('${item.nId}')" >Xóa</button>
                    <button data-toggle="modal"
                    data-target="#myModal" class="btn btn-info" onclick="hienThiChiTiet('${item.nId}')" >Sửa</button>
                </td>
            </tr>
        `;
  });
  tbody.innerHTML = content;
}

//Hàm xóa nhân viên
//Khai báo hàm
function xoaTinTuc(ma) {
  dstt.deleteNews(ma);
  console.log("ok");
  taoBang(dstt.newsArray);
  setLocalStorage();
}
function hienThiChiTiet(ma) {
  //Lấy đối tượng nhân viên từ mảng
  var tt = dstt.getDetail(ma);

  //Xử lý button
  getELE("btnThemTt").style.display = "none";
  getELE("btnCapNhat").style.display = "block";

  //Điền thông tin tin tuc lên form
  getELE("newsId").value = tt.nId;
  getELE("newsId").disabled = "true";

  getELE("newsName").value = tt.nName;
  getELE("newsDescription").value = tt.nDescription;
  getELE("newsDetail").value = tt.nDetail;
  getELE("newsImage").value = tt.nImage;
}

getELE("btnCapNhat").onclick = capNhatTinTuc;
function capNhatTinTuc() {
  //lấy thông tin nhân viên
  var _nId = getELE("newsId").value;
  var _nName = getELE("newsName").value;
  var _nDescription = getELE("newsDescription").value;
  var _nDetail = getELE("newsDetail").value;
  var _nImage = getELE("newsImage").value;

  //Tạo instance(thể hiện)
  var tt = new News(_nId, _nName, _nDescription, _nDetail, _nImage);
  console.log(tt);
  // Cap nhat nguoi dung
  dstt.editNews(tt);
  taoBang(dstt.newsArray);
  setLocalStorage();
}

//Hàm lưu data xuống local storage (chỗ lưu trữ offline trong trình duyệt của người dùng)
//Khai báo hàm
function setLocalStorage() {
  //Lưu dữ liệu xuống LocalStorage
  //chỉ cho phép lưu trữ dữ liệu kiểu json
  //chuyển kiểu mảng sang kiểu json => dùng stringify của đối tương JSON
  localStorage.setItem("DSTT", JSON.stringify(dstt.newsArray));
}
//Khai báo hàm
function getLocalStorage() {
  //Lấy dữ liệu từ localStorage
  // parse: chuyển json sang kiểu mảng
  //Kiểm tra localStorage
  if (localStorage.getItem("DSTT") != null) {
    dstt.newsArray = JSON.parse(localStorage.getItem("DSTT"));
    taoBang(dstt.newsArray);
  }
}

// C1: click button search rồi mới tìm kiếm
getELE("btnTimTt").addEventListener("click", function () {
  var chuoiTK = getELE("searchName").value;
  var mangTK = [];
  mangTK = dstt.searchNews(chuoiTK);
  taoBang(mangTK);
});

//C2: gõ từ khóa vào input và search liền
getELE("searchName").addEventListener("keypress", function () {
  var chuoiTK = getELE("searchName").value;
  var mangTK = [];
  mangTK = dstt.searchNews(chuoiTK);
  taoBang(mangTK);
});
