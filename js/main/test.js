var addBtn = $("#addUser"),
  removeBtns = $(".removeItem");

var options = {
  valueNames: [
    { data: ["id"] },
    "itemId",
    { attr: "value", name: "name" },
    { attr: "value", name: "born" },
    { attr: "data-value", name: "device" },
    { attr: "value", name: "joinAt" },
  ],
  item: `<tr class="id" data-id="">
      <td><span class="itemId"></span></td>
      <td><input class="name form-control" value=""></td>
      <td><input class="born form-control" value=""></td>
      <td>
        <select class="device form-control" name="device[]">
          <option class="deviceType" data-value="iOS">iOS</option>
          <option class="deviceType" value="android">Android</option>
        </select>
      </td>
      <td>
        <div class='input-group date datetimepicker' style="position: relative">
          <input type="text" class="joinAt form-control" value=""/>
          <span class="input-group-addon">
            <span class="glyphicon glyphicon-calendar"></span>
          </span>
        </div>
      </td>
      <td class="remove">
        <button class="removeItem btn btn-xs btn-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
      </td>
    </tr>`,
};

// Prepare initial user data
var values = [
  {
    id: 1,
    itemId: "#1",
    name: "Jonny Strömberg",
    born: 1986,
    device: "iOS",
    joinAt: "2017-01-13 00:17:49",
  },
  {
    id: 2,
    itemId: "#2",
    name: "Jonas Arnklint",
    born: 1985,
    device: "iOS",
    joinAt: "2017-12-29 13:17:49",
  },
  {
    id: 3,
    itemId: "#3",
    name: "Martina Elm",
    born: 1986,
    device: "android",
    joinAt: "2018-04-03 02:17:49",
  },
];

// Create user list
var userList = new List("users", options, values);

// Add one more item into list
userList.add({
  id: 4,
  itemId: "#4",
  name: "Gustaf Lindqvist",
  born: 1983,
  device: "android",
  joinAt: "2018-04-03 10:17:49",
});

// Get size of list (except headers)
var size = userList.size();

// Sets callbacks to the buttons and other elements in the list
refreshCallbacks();

function refreshCallbacks() {
  // Trigger event for new generated row/object
  removeBtns = $(removeBtns.selector);
  removeBtns.click(function () {
    var itemId = $(this).closest("tr").data("id");
    userList.remove("id", itemId);
  });

  // Re-set device of each select
  let deviceOptions = $(".deviceType");
  deviceOptions.each(function () {
    let parentSelect = $(this).closest("select").data("value");
    if (parentSelect === this.value) {
      $(this).attr("selected", "selected");
    }
  });

  // Add Datetime Picker
  $(".datetimepicker").datetimepicker({
    format: "YYYY-MM-DD HH:mm:ss",
  });
}

// Add new blank row into tables if click button Add
addBtn.click(function () {
  userList.add({
    id: ++size,
    itemId: `#${size}`,
    name: "",
    born: "",
    joinAt: "",
  });
  refreshCallbacks();
});
