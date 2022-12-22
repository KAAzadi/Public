var account = {};
(function() {
    account.logon = function() {
        var findDiv = document.createElement("div");
        findDiv.classList.add("find");

        var userIdSpan = document.createElement('span');
        userIdSpan.innerHTML = "Enter email: ";
        findDiv.appendChild(userIdSpan);

        var userIdInput = document.createElement("input");
        findDiv.appendChild(userIdInput);

        var userPassSpan = document.createElement('span');
        userPassSpan.innerHTML = "Enter password: ";
        findDiv.appendChild(userPassSpan);

        var userPassInput = document.createElement("input");
        userPassInput.setAttribute("type", "password"); // so it shows dots not characters
        findDiv.appendChild(userPassInput);
        // Note: for this lab activity, you may want to comment out setting the input type to password, 
        // but you will certainly want to apply input type=password to the password text box 
        // when you implement your own log on code.

        var findButton = document.createElement("button");
        findButton.innerHTML = "Login";
        findDiv.appendChild(findButton);

        var msgDiv = document.createElement("div");
        findDiv.appendChild(msgDiv);

        findButton.onclick = function () {

            // You have to encodeURI user input before putting into a URL for an AJAX call.
            // Otherwise, your URL may be refused (for security reasons) by the web server.
            var url = "webAPIs/logonAPI.jsp?userEmail="+encodeURI(userIdInput.value)+"&password=" + encodeURI(userPassInput.value);

            console.log("onclick function will make AJAX call with url: " + url);
            ajax(url, processLogon, msgDiv);
            
            function processLogon(obj) {
                msgDiv.innerHTML = buildProfile(obj);
            }
        };
    
    return findDiv;
    };
    
    account.getProfile = function(){
        var profileDiv = document.createElement("div");
        var url = "webAPIs/getProfileAPI.jsp";
        
        var msgDiv = document.createElement("div");
        ajax(url, processProfile, msgDiv);
        profileDiv.appendChild(msgDiv);
        
        function processProfile(obj){
            msgDiv.innerHTML = buildProfile(obj)
        };
        
        return profileDiv
    };
    
    account.logoff = function() {
        var url = "webAPIs/logoffAPI.jsp";
        var msgDiv = document.createElement("div");
        ajax(url, processLogout, msgDiv);
        
        function processLogout(){
            msgDiv.innerHTML = "User has been logged off";
        };
        
        return msgDiv;
    };    
    
    function buildProfile(obj) {
        var msg = "";
        console.log("Successfully called the find API. Next line shows the returned object.");
        console.log(obj);
        if (obj.errorMsg.length > 0) {
            msg += "<strong>Error: " + obj.errorMsg + "</strong>";
        } else {
            msg += "<strong>Welcome Web User " + obj.webUserId + "</strong>";
            msg += "<br/> Birthday: " + obj.birthday;
            msg += "<br/> MembershipFee: " + obj.membershipFee;
            msg += "<br/> User Role: " + obj.userRoleId + " " + obj.userRoleType;
            msg += "<p> <img src ='" + obj.image + "'></p>";
        }        
        return msg;
    };
}());
