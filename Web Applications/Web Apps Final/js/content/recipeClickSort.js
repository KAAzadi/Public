function recipeClickSort() {

     var content = ``;
    var ele = document.createElement("div");
    ele.innerHTML = content; // the HTML code specified just above...
    
    var img = document.createElement("img");
    img.src = "icons/more_icons/plus.png";
    img.onclick = function () {
    // By changing the URL, you invoke the user insert - just as if someone had clicked on “Account – Register”
        window.location.hash = "#/insertRecipe";
    };
    ele.appendChild(img);
    
    var flexBox = document.createElement("div");
    flexBox.classList.add('flexContainer'); // see styling in this file, above...
    ele.appendChild(flexBox);
    
    
    var url = "webAPIs/listOtherAPI.jsp";
    ajax(url,processData, document.getElementById("content"));
    
    function processData(recipeList) {
        // print out JS object/array that was converted from JSON data by ajax function
        console.log(recipeList);

        // build new list as we want the fields to appear in the HTML table
        // we can decide the order we want the fields to appear (first property defined is shown first)
        // we can combine, decide to exclude etc...
        var newRecipeList = [];

        // modify properties (image and price) of the array of objects so it will look 
        // better on the page.
        for (var i = 0; i < recipeList["recipeList"].length; i++) {

            newRecipeList[i] = {};
            // Don't show the id (no meaningful data)
            newRecipeList[i].Image = SortableTableUtils.makeImage(recipeList["recipeList"][i].recipeImage, "5rem");
            newRecipeList[i].Name = SortableTableUtils.makeText(recipeList["recipeList"][i].recipeName);
            // Don't show the password
            newRecipeList[i].Stars = SortableTableUtils.makeNumber(recipeList["recipeList"][i].recipeRatingStars, false);

            // true means format like currency
            newRecipeList[i].KeyWords = SortableTableUtils.makeText(recipeList["recipeList"][i].recipeKeywords);
            newRecipeList[i].id = SortableTableUtils.makeNumber(recipeList["recipeList"][i].recipeId, false);
            
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
        var csObj2 = MakeClickSortTable("My Recipes", newRecipeList,"Name", "icons/blackSort.png","#/recipeUpdate/", "webAPIs/deleteRecipeAPI.jsp?id=");
        csObj2.classList.add("clickSort");
        flexBox.appendChild(csObj2);
    }

    return ele;
}