/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
function MakeRecipe(params) {
    if (!params) {
        throw "Error: MakeRecipe requires a parameter object";
    }

    var recObj = document.createElement("div");
    recObj.classList.add("rec");

    recObj.name = params.name || "No Name Entered";

    var recImg = document.createElement("img");
    recImg.src = params.img || "images/sad.png";
    
    var link = document.createElement('a');
    link.title = params.link || "No Link Provided";
    if(link.title !== "No Link Provided"){
        link.href = params.link;
    }
            

    var recInfo = document.createElement("div");
    recObj.appendChild(recInfo);
    var display = function () {
        recInfo.innerHTML = "Name: " + recObj.name + "<br/> Link: " + link;
    };

    recObj.setName = function (newName) {
        recObj.name = newName;
        display();
    };

    recObj.setLink = function (newLink) {
        var a = document.createElement('a');
        var linkText = newLink;
        a.title = linkText;
        a.href = newLink;
        link = a;
        display();
    };

    recObj.appendChild(recImg);
    recObj.appendChild(document.createElement("br"));

    //name UI
    var nameButton = document.createElement("button");
    var nameInput = document.createElement("input");

    nameButton.innerHTML = "Change name to: ";

    recObj.appendChild(nameButton);
    recObj.appendChild(nameInput);

    nameButton.onclick = function () {
        recObj.setName(nameInput.value);
    };
    recObj.appendChild(document.createElement("br"));

    //link UI
    var linkButton = document.createElement("button");
    var linkInput = document.createElement("input");

    linkButton.innerHTML = "Change link to: ";

    recObj.appendChild(linkButton);
    recObj.appendChild(linkInput);

    linkButton.onclick = function () {
        console.log("changing link to " + linkInput.value);
        recObj.setLink(linkInput.value);
        display();
    };
    recObj.appendChild(document.createElement("br"));

    display();
    return recObj;
}

