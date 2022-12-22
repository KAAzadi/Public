"use strict";
function homeContent () {

// ` this is a "back tick". You can use it to define multi-line strings in JavaScript.
// 
// NetBeans menu option "Source - Format" will not work with the text inside of a 
// String, so you have to do this indentation manually with the editor. 

var content = `

        <!-- about me content -->
        <div>
            <p>Over the summer I had 2 major changes occur in my life.</p>
            <p>The first was the birth of my son! He has been easily one of the
            most amazing things to ever happen to me. Everyone always said my
            life was going to change, and even though I tried to prepare for it,
            nothing prepared me quite as well as I hoped. Regardless, having my
            son in my life has been amazing. Even though he takes up a large 
            portion of my waking time, free or not, I have been able to find a 
            fine balance between my private and public life.</p>
            
            <p>The second thing to happen in my life occured while my wife was
            pregnant. As time progressed, I would try and do more and more to 
            help make her more comfortable while she was doing all of the hard 
            work, and somewhere alongg the line I picked up cooking. Home 
            cooking, fine dining, you name it! That's where this website comes 
            into the picture. My hope is to create a resource where I can store 
            all of the recipes I have found. One such example led to a meal 
            similar to the one below.</p>
            
            <img id="exampleImage" src='images/salmon.jpg'>
            <br>
            <a href='https://www.babaganosh.org/crispy-salmon-skin-bacon/'>Click here to check out the recipe!</a>
    
            <p>Probably the hardest part of my journey into cooking was trying to
            find a good way to store all the recipes I found, rather than hoping
            all the tabs I pull up do not disappear at some point. That's where 
            this website comes into the picture. By creating an account, you can
            create a database of recipes you have enjoyed!</p>
        </div>
    
    
    `;
        var ele = document.createElement("div");
        ele.innerHTML = content;
        return ele;
        }