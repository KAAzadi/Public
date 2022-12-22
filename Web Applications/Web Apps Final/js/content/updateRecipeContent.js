updateRecipeContent = {}; // Update Solutioin Spring 2022

(function () {  // This is an IIFE, an immediately executing function.
    // It is an anonymous function that runs once (and only once) at page load time.
    // Put in here any private functions to be shared (e.g., by webUserMods.insert 
    // and webUserMods.update). 

    //alert("I am an IIFE!"); // runs only at page load time...

    // All variables declared in this area (before webUserMods.insert) 
    // are avilable to webUserMods.insert AND webUserMods.update. 


    var fields = [
        {
            fieldName: "recipeId",
            prompt: "recipe Id",
            disabled: true
        },
        {
            fieldName: "recipeImage",
            prompt: "Image URL"  // if you forget to add the prompt, it uses the field name as prompt
        },
        {
            fieldName: "recipeKeywords",
            prompt: "Keywords"
        },
        {
            fieldName: "recipeName",
            prompt: "Name"
        },
        {
            fieldName: "recipeNotes",
            prompt: "Notes"
        },
        {
            fieldName: "recipeRatingStars",
            prompt: "Stars (out of 5)"
        },
        {
            fieldName: "recipeURL",
            prompt: "recipe URL"
        },
        {
            fieldName: "webUserEmail",
            prompt: "Email Address",
            pickList: true
        }
    ];

    var component = document.createElement("div");

    // call reusable function to make an edit area component
    var userEditArea = MakeEditArea({
        areaTitle: "recipes",
        fieldDefn: fields
    });
    component.appendChild(userEditArea);

    updateRecipeContent.insert = function () {

        // Create UI for insert (using the shared DOM elements just above, in the IIFE).
        userEditArea.areaTitle.innerHTML = "New Recipe";
        userEditArea.blankInputs();
        userEditArea.button.innerHTML = "Insert Save";
        userEditArea.formMsg.innerHTML = ""; // wipe out any old message

        // *********************************************************
        // Add role pick list to userEditArea (the userRoleId row of the HTML table). 
        // I wanted to show how you could get fresh list of user roles from the DB 
        // with each user insert since you'll need to do something like this for 
        // insert "other" (get a fresh copy of users for the webuser FK from "other"). 
        ajax("webAPIs/listUsersAPI.jsp", processUsers, userEditArea.formMsg);

        function processUsers(obj) {
            // obj is the list of roles returned by the getRolesAPI.jsp
            if (obj.dbError.length > 0) {
                userEditArea["webUserEmail"].errorTd.innerHTML +=
                        "Programmer Error: Cannot Create Role Pick List... " +
                        obj.dbError;
            } else {
                var selectTag = Utils.makePickList({
                    list: obj.webUserList,
                    idProp: "webUserId",
                    displayProp: "userEmail"
                });

                // put the Role select tag (just made) into the inputTd property 
                // of the UserRoleId row of the HTML table 
                userEditArea["webUserEmail"].inputTd.innerHTML = "";
                userEditArea["webUserEmail"].inputTd.appendChild(selectTag);
            }
        } // processRoles (ajax call back function 
        // *********************************************************

        userEditArea.button.onclick = function () {  // INSERT SAVE

            // inputObj is an object with all user input values. 
            var userInputObj = userEditArea.getDataFromUI();

            // Place the role (selected option of the select tag) into the userInputObj
            var roleSelect = userEditArea["webUserID"].inputTd.getElementsByTagName("select")[0];
            userInputObj.webUserID = roleSelect.options[roleSelect.selectedIndex].value;

            // convert userInputObj to JSON and URL encode (e.g., turns space to %20), 
            // URL encode so that the server does not reject URL for security reasons.
            var urlParams = encodeURIComponent(JSON.stringify(userInputObj));
            console.log("Insert Save URL params: " + urlParams);

            ajax("webAPIs/insertUserAPI.jsp?jsonData=" + urlParams, reportInsert, userEditArea.formMsg);

            function reportInsert(obj) {

                // obj is the error message object (passed back from the Insert API).
                // obj (conveniently) has its fields named exactly the same as the input data was named. 

                console.log("Insert API response (error message object) on next line");
                console.log(obj);

                // write all the error messages to the UI (into the third column for each row).
                userEditArea.writeErrorObjToUI(obj);

                if (obj.errorMsg.length === 0) { // success
                    userEditArea.formMsg.innerHTML = "Record successfully inserted.";
                } else {
                    userEditArea.formMsg.innerHTML = obj.errorMsg;
                }
            }
        };

        return component;
    }; // webUserMods.insert



    // NOTE: this is the first content generating component that takes an input 
    // parameter. So we now use NavRouter parameters (NavRouter extracts parameter 
    // from the link (if there is one) and passes that parameter to the content 
    // generating function (that's been specified in the routing table). 
    // Example:  if the URL has this: userUpdate/4. 
    // The NavRouter extracts the 4 from the URL and passes that 4 to the content
    // generating function that's associated with link "#/userUpdate".

    // This function gets a web_user record (by id) then places that data into the Edit UI. .
    updateRecipeContent.update = function (recipeId) {

        userEditArea.areaTitle.innerHTML = "Update Web User";
        userEditArea.blankInputs();
        userEditArea.button.innerHTML = "Update Save";
        userEditArea.formMsg.innerHTML = ""; // wipe out any old message

        console.log("webUsers.update called with webUserId " + recipeId);

        // get the web user record with the given webUserId
        ajax("webAPIs/getRecipeByIdAPI.jsp?recipeID=" + recipeId, gotRecordById, userEditArea.formMsg);

        // webUserObj is the output of getUserByIdAPI.jsp
        function gotRecordById(webUserObj) {

            userEditArea.writeDbValuesToUI(webUserObj);

            // get an updated list of roles (even though this does not change often), 
            // just so you see how to get a fresh role list with each web user insert.
            ajax("webAPIs/listUsersAPI.jsp", processUsers, userEditArea.formMsg);

            // obj is the output from the above API
            function processUsers(obj) {

                if (obj.dbError.length > 0) {
                    userEditArea["webUserEmail"].errorTd.innerHTML += "Programmer Error: Cannot Create Role Pick List";
                } else {
                    console.log("webUserEmail is " + webUserObj.userRoleId);
                    var selectTag = Utils.makePickList({
                        list: obj.webUserList,
                        idProp: "webUserId",
                        displayProp: "userEmail",
                        selectedKey: webUserObj.webUserID  // key that is to be pre-selected (optional)
                    });

                    // Put the User Role Select Tag (just created) into the input column of the 
                    // userRoleId row of the HTML table we're using for data entry.
                    userEditArea["webUserEmail"].inputTd.innerHTML = "";
                    userEditArea["webUserEmail"].inputTd.appendChild(selectTag);
                }
            } // processRoles
        } // gotRecordById


        userEditArea.button.onclick = function () { // Update Save

            // collect all the user input values into an object. 
            var userInputObj = userEditArea.getDataFromUI();

            // find the user role selected from the select tag (and put it into userInputObj).
            var roleSelect = userEditArea["webUserEmail"].inputTd.getElementsByTagName("select")[0];
            userInputObj.webUserID = roleSelect.options[roleSelect.selectedIndex].value;

            // convert userInputObj to JSON and URL encode (turns space to %20), 
            // so server does not reject URL for security reasons.
            var urlParams = encodeURIComponent(JSON.stringify(userInputObj));
            console.log("Update Save URL params: " + urlParams);

            ajax("webAPIs/updateRecipeAPI.jsp?jsonData=" + urlParams, reportUpdate, userEditArea.formMsg);

            function reportUpdate(jsErrorObj) {

                userEditArea.writeErrorObjToUI(jsErrorObj);

                // jsErrorObj is a StringData object full of error messages 
                // (using same field names). 

                if (jsErrorObj.errorMsg.length === 0) { // success
                    userEditArea.formMsg.innerHTML = "Record successfully updated. ";
                } else {
                    userEditArea.formMsg.innerHTML = jsErrorObj.errorMsg;
                }
            }
        }; //updateSave submit button

        return component;

    }; // end of webUsers.update

}());  


