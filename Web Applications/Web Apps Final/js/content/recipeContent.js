"use strict";
function recipeContent() {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = ` 
      <h4>My Recipes</h4>
      <p>
        Look at these recipes! 
      </p>
    `;

    var ele = document.createElement("div");
    ele.innerHTML = content;


    var rec1 = MakeRecipe({ name: "Salmon Bacon", link: "https://www.babaganosh.org/crispy-salmon-skin-bacon/", img: "images/salmon.jpg" });
    ele.appendChild(rec1);

    var rec2 = MakeRecipe({ name: "Hollandaise Sauce", link: "https://www.foodnetwork.com/recipes/tyler-florence/hollandaise-sauce-recipe-1910043", img: "images/hollandaise.jpeg" });
    ele.appendChild(rec2);

    var recDefault = MakeRecipe({});
    ele.appendChild(recDefault);

    return ele;
}

