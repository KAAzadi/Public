function userClickSort() {

    var content = ``;
    var ele = document.createElement("div");
    ele.innerHTML = content; // the HTML code specified just above...
    var flexBox = document.createElement("div");
    flexBox.classList.add('flexContainer'); // see styling in this file, above...
    ele.appendChild(flexBox);

    var url = "webAPIs/listUsersAPI.jsp";
    ajax(url,processData, document.getElementById("content"));
    
    function processData(userList) {
        // print out JS object/array that was converted from JSON data by ajax function
        console.log(userList);

        // build new list as we want the fields to appear in the HTML table
        // we can decide the order we want the fields to appear (first property defined is shown first)
        // we can combine, decide to exclude etc...
        var newUserList = [];

        // modify properties (image and price) of the array of objects so it will look 
        // better on the page.
        for (var i = 0; i < userList["webUserList"].length; i++) {
            var temp = {};
            // Don't show the id (no meaningful data)
            temp.Image = SortableTableUtils.makeImage(userList["webUserList"][i].image, "5rem");
            temp.Email = SortableTableUtils.makeText(userList["webUserList"][i].userEmail);
            // Don't show the password
            temp.Birthdate = SortableTableUtils.makeText(userList["webUserList"][i].birthday);

            // true means format like currency
            temp.MembershipFee = SortableTableUtils.makeNumber(userList["webUserList"][i].membershipFee, true);
            
            temp.id = SortableTableUtils.makeNumber(userList["webUserList"][i].webUserId, false);
            newUserList[i] = temp;
        }

        /*    
         "webUserId": "2",
         "userEmail": "dominic@temple.edu",
         "userPassword": "p",
         "image": "http://cis-linux2.temple.edu/~sallyk/pics_users/dominic.jpg",
         "birthday": "",
         "membershipFee": "$1,000.99",
         "userRoleId": "3",
         "userRoleType": "Member",
         "errorMsg": ""
         */

        // Making a DOM object, nothing shows yet... 
        //document.getElementById("content").appendChild(MakeTableBetter("The CIS Club", newUserList));
        var csObj2 = MakeClickSortTable("My Users", newUserList,"Email", "icons/blackSort.png", "#/userUpdate/", "webAPIs/deleteUserAPI.jsp?id=");
        csObj2.classList.add("clickSort");
        flexBox.appendChild(csObj2);
    }

    return ele;
}