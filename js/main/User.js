/*
 * Mục Đích:
 * Chứa thông tin cua nguoi dung
 */

function User(
  _userId,
  _userName,
  _userPhone,
  _userEmail,
  _userPassword,
  _userAddress,
  _userRole
) {
  //Thuộc tính
  //Key= value
  this.userId = _userId;
  this.userName = _userName;
  this.userPhone = _userPhone;
  this.userEmail = _userEmail;
  this.userPassword = _userPassword;
  this.userAddress = _userAddress;
  this.userRole = _userRole;
}

function Product(
  _pId,
  _bId,
  _pName,
  _pPrice,
  _pDescription,
  _pDetail,
  _pImage
) {
  this.pId = _pId;
  this.bId = _bId;
  this.pName = _pName;
  this.pPrice = _pPrice;
  this.pDescription = _pDescription;
  this.pDetail = _pDetail;
  this.pImage = _pImage;
}

function News(_nId, _nName, _nDescription, _nDetail, _nImage) {
  this.nId = _nId;
  this.nName = _nName;
  this.nDescription = _nDescription;
  this.nDetail = _nDetail;
  this.nImage = _nImage;
}

function Appointment(_aId, _uId, _aState, _aDate) {
  this.aId = _aId;
  this.uId = _uId;
  this.aState = _aState;
  this.aDate = _aDate;
}

function Brand(_bId, _bName, _bContent, _bImage) {
  this.bId = _bId;
  this.bName = _bName;
  this.bContent = _bContent;
  this.bImage = _bImage;
}
