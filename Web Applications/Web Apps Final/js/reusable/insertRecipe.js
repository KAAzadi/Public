/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function insertRecipe() {
    console.log("insertRecipe was called");

    // create a user object from the values that the user has typed into the page.
    var userInputObj = {
        "recipeID": "",
        "recipeName": document.getElementById("recipeName").value,
        "recipeImage": document.getElementById("recipeImage").value,
        "recipeNotes": document.getElementById("recipeNotes").value,
        "recipeURL": document.getElementById("recipeURL").value,
        "recipeStars": document.getElementById("recipeRatingStars").value,
        "timesUsed": document.getElementById("recipeTimesUsed").value,
        "keywords": document.getElementById("recipeKeywords").value,
        "webUserID": document.getElementById("userEmailSelect").value,
        "errorMsg": ""
    };
    console.log(userInputObj);

    // build the url for the ajax call. Remember to encodeURI the user input object or else 
    // you may get a security error from the server. JSON.stringify converts the javaScript
    // object into JSON format (the reverse operation of what gson does on the server side).
    var myData = encodeURI(JSON.stringify(userInputObj));
    var url = "webAPIs/insertRecipeAPI.jsp?jsonData=" + myData;
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

        //document.getElementById("idError").innerHTML = jsObj.recipeID;
        document.getElementById("nameError").innerHTML = jsObj.recipeName;
        document.getElementById("imageError").innerHTML = jsObj.recipeImage;
        document.getElementById("notesError").innerHTML = jsObj.recipeNotes;
        document.getElementById("urlError").innerHTML = jsObj.recipeURL;
        document.getElementById("ratingError").innerHTML = jsObj.recipeRatingStars;
        document.getElementById("timesError").innerHTML = jsObj.recipeTimesUsed;
        document.getElementById("keywordsError").innerHTML = jsObj.recipeKeywords;
        document.getElementById("emailError").innerHTML = jsObj.webUserID;

        if (jsObj.errorMsg.length === 0) { // success
            jsObj.errorMsg = "Record successfully inserted !!!";
        }
        document.getElementById("recordError").innerHTML = jsObj.errorMsg;
    }
}

