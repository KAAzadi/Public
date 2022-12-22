function registerRecipe() {
    
    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = ` 
        <div>
            <table>
                <tr>
                    <td>Recipe ID</td>
                    <td><input type="text"  id="recipeID" readonly/></td>
                    <td id="idError" class="error"></td> 
                </tr>
                <tr>
                    <td>Recipe Name</td>
                    <td><input type="text"  id="recipeName" /></td>
                    <td id="nameError" class="error"></td> 
                </tr>
                <tr>
                    <td>Recipe Image</td>
                    <td><input type="text"  id="recipeImage" /></td>
                    <td id="imageError" class="error"></td> 
                </tr>
                <tr>
                    <td>Recipe Notes</td>
                    <td><input type="text"  id="recipeNotes" /></td>
                    <td id="notesError" class="error"></td> 
                </tr>
                <tr>
                    <td>Recipe URL</td>
                    <td><input type="text" id="recipeURL" /></td>
                    <td id="urlError" class="error"></td>
                </tr>
                <tr>
                    <td>Recipe Rating (out of 5 stars)</td>
                    <td><input type="text"  id="recipeRatingStars" /></td>
                    <td id="ratingError" class="error"></td> 
                </tr>
                <tr>
                    <td>Times Used the Recipe</td>
                    <td><input type="text"  id="recipeTimesUsed" /></td>
                    <td id="timesError" class="error"></td> 
                </tr>
                <tr>
                    <td>Recipe keywords</td>
                    <td><input type="text"  id="recipeKeywords" /></td>
                    <td id="keywordsError" class="error"></td> 
                </tr>
                <tr>
                    <td>User Email</td>
                    <td type = "type" id = "userID">
                        <select id="userEmailSelect">
                            <option value="1">tuf48228@temple.edu</option>
                            <option value="2">totally@real.com</option>
                            <option value="3">;l;askjd@kdj.net</option>
                            <option value="4">123@45.6</option>
                            <option value="5">IAmA@donut.com</option>
                            <option value="6">pizza@email.com</option>
                            <option value="8">thing@yes.com</option>
                            <option value="9">testAPI</option>
                            <option value="10">test</option>
                            <option value="11">this@mail.com</option>
                        </select></td>
                    <td id="emailError" class="error"></td>
                </tr>
                <tr>
                    <td><button onclick="insertRecipe()">Save</button></td>
                    <td id="recordError" class="error"></td>
                    <td></td>
                </tr>
            </table>
        </div>
    `;
    
    function getEmails(ele){
        var list = document.getElementById("userEmailSelect")
        var item1 = document.createElement("option");
        item1.value = "myValue";
        item1.text = "pizza";
    }
    var ele = document.createElement("div");
    ele.innerHTML = content;
    getEmails();
    return ele;    
}

