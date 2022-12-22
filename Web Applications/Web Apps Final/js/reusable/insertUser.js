/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function insertUser() {
    console.log("insertUser was called");

    // create a user object from the values that the user has typed into the page.
    var userInputObj = {
        "webUserId": "",
        "userEmail": document.getElementById("userEmail").value,
        "userPassword": document.getElementById("userPassword").value,
        "userPassword2": document.getElementById("userPassword2").value,
        "image": document.getElementById("image").value,
        "birthday": document.getElementById("birthday").value,
        "membershipFee": document.getElementById("membershipFee").value,
        "userRoleId": document.getElementById("userRoleId").value,
        "userRoleType": "",
        "errorMsg": ""
    };
    console.log(userInputObj);

    // build the url for the ajax call. Remember to encodeURI the user input object or else 
    // you may get a security error from the server. JSON.stringify converts the javaScript
    // object into JSON format (the reverse operation of what gson does on the server side).
    var myData = encodeURI(JSON.stringify(userInputObj));
    var url = "webAPIs/insertUserAPI.jsp?jsonData=" + myData;
    ajax(url, insertAPISuccess, document.getElementById("recordError"));

    function insertAPISuccess(jsObj) {
        // Running this function does not mean insert success. It just means that the Web API
        // call (to insert the record) was successful.
        // 
        // the server prints out a JSON string of an object that holds field level error 
        // messages. The error message object (conveniently) has its fiels named exactly 
        // the same as the input data was named. 
        console.log("here is JSON object (holds error messages.");
        console.log(jsObj);

        document.getElementById("userEmailError").innerHTML = jsObj.userEmail;
        document.getElementById("userPasswordError").innerHTML = jsObj.userPassword;
        document.getElementById("userPassword2Error").innerHTML = jsObj.userPassword2;
        document.getElementById("imageError").innerHTML = jsObj.image;
        document.getElementById("birthdayError").innerHTML = jsObj.birthday;
        document.getElementById("membershipFeeError").innerHTML = jsObj.membershipFee;
        document.getElementById("userRoleIdError").innerHTML = jsObj.userRoleId;

        if (jsObj.errorMsg.length === 0) { // success
            jsObj.errorMsg = "Record successfully inserted !!!";
        }
        document.getElementById("recordError").innerHTML = jsObj.errorMsg;
    }
};

