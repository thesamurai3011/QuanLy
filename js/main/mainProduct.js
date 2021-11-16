//Khai báo biến toàn cục
var dssp = new ProductList();
var validation = new Validation();

//Khi trang vừa load thì chạy code bên trong hàm getLocalStorage
getLocalStorage();

//Hàm rút gọn cú pháp document.getElementById
function getELE(id) {
  return document.getElementById(id);
}

// Xử lý UI khi thêm nhân viên
getELE("btnAddProduct").addEventListener("click", function () {
  //Xử lý button
  getELE("btnThemSp").style.display = "block";
  getELE("btnCapNhat").style.display = "none";
  getELE("productId").removeAttribute("disabled");
  getELE("formSp").reset();
});

//btn.onclick = function(){}
//Khi gán hàm cho onclick không để dấu tròn (), để tránh hàm chạy khi trang vừa load
getELE("btnThemSp").onclick = themSanPham;

//Hàm lấy thông tin nhân viên, thêm nhân viên
//Khai báo hàm
function themSanPham() {
  //lấy thông tin nhân viên
  var _pId = getELE("productId").value;
  var _bId = getELE("brandId").value;
  var _pName = getELE("productName").value;
  var _pPrice = getELE("productPrice").value;
  var _pDescription = getELE("productDescription").value;
  var _pDetail = getELE("productDetail").value;
  var _pImage = getELE("productImage").value;

  console.log(_pId, _bId, _pName, _pPrice, _pDescription, _pDetail, _pImage);

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
  var sp = new Product(
    _pId,
    _bId,
    _pName,
    _pPrice,
    _pDescription,
    _pDetail,
    _pImage
  );
  console.log(sp);
  dssp.addProduct(sp);
  console.log(dssp.productArray);
  //Gọi hàm
  taoBang(dssp.productArray);
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
                <td>${item.pId}</td>
                <td>${item.bId}</td>
                <td>${item.pName}</td>
                <td>${item.pPrice}</td>
                <td>${item.pDescription}</td>
                <td>${item.pDetail}</td>
                <td>${item.pImage}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaSanPham('${item.pId}')" >Xóa</button>
                    <button data-toggle="modal"
                    data-target="#myModal" class="btn btn-info" onclick="hienThiChiTiet('${item.pId}')" >Sửa</button>
                </td>
            </tr>
        `;
  });
  tbody.innerHTML = content;
}

//Hàm xóa nhân viên
//Khai báo hàm
function xoaSanPham(ma) {
  dssp.deleteProduct(ma);
  console.log("ok");
  taoBang(dssp.productArray);
  setLocalStorage();
}
function hienThiChiTiet(ma) {
  //Lấy đối tượng nhân viên từ mảng
  var sp = dssp.getDetail(ma);

  //Xử lý button
  getELE("btnThemSp").style.display = "none";
  getELE("btnCapNhat").style.display = "block";

  //Điền thông tin nhân viên lên form
  getELE("productId").value = sp.pId;
  getELE("productId").disabled = "true";

  getELE("brandId").value = sp.bId;
  getELE("productName").value = sp.pName;
  getELE("productPrice").value = sp.pPrice;
  getELE("productDescription").value = sp.pDescription;
  getELE("productDetail").value = sp.pDetail;
  getELE("productImage").value = sp.pImage;
}

getELE("btnCapNhat").onclick = capNhatSanPham;
function capNhatSanPham() {
  //lấy thông tin nhân viên
  var _pId = getELE("productId").value;
  var _bId = getELE("brandId").value;
  var _pName = getELE("productName").value;
  var _pDetail = getELE("productDetail").value;
  var _pPrice = getELE("productPrice").value;
  var _pDescription = getELE("productDescription").value;
  var _pImage = getELE("productImage").value;

  //Tạo instance(thể hiện)
  var sp = new Product(
    _pId,
    _bId,
    _pName,
    _pPrice,
    _pDescription,
    _pDetail,
    _pImage
  );
  console.log(sp);

  // Cap nhat nguoi dung
  dssp.editProduct(sp);
  taoBang(dssp.productArray);
  setLocalStorage();
}

//Hàm lưu data xuống local storage (chỗ lưu trữ offline trong trình duyệt của người dùng)
//Khai báo hàm
function setLocalStorage() {
  //Lưu dữ liệu xuống LocalStorage
  //chỉ cho phép lưu trữ dữ liệu kiểu json
  //chuyển kiểu mảng sang kiểu json => dùng stringify của đối tương JSON
  localStorage.setItem("DSSP", JSON.stringify(dssp.productArray));
}
//Khai báo hàm
function getLocalStorage() {
  //Lấy dữ liệu từ localStorage
  // parse: chuyển json sang kiểu mảng
  //Kiểm tra localStorage
  if (localStorage.getItem("DSSP") != null) {
    dssp.productArray = JSON.parse(localStorage.getItem("DSSP"));
    taoBang(dssp.productArray);
  }
}

// C1: click button search rồi mới tìm kiếm
getELE("btnTimSp").addEventListener("click", function () {
  var chuoiTK = getELE("searchName").value;
  var mangTK = [];
  mangTK = dssp.searchProduct(chuoiTK);
  taoBang(mangTK);
});

//C2: gõ từ khóa vào input và search liền
getELE("searchName").addEventListener("keypress", function () {
  var chuoiTK = getELE("searchName").value;
  var mangTK = [];
  mangTK = dssp.searchProduct(chuoiTK);
  taoBang(mangTK);
});
