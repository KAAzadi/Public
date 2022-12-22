"use strict";
function blogContent() {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = ` 
      <h1>My Blog</h1>
      <br/>
      <h4>My Database</h4>
      <p>My database will revolve around the recipes I have found. It will
            have an auto increment primary key, and the name of the recipe will
            be unique name. There will be an image of the meal from the recipe. 
            The two nullable fields will be a personal note, and a rating of the
            dish. Other fields will include a link to the recipe and whether I 
            will make it again.</p>
    
        <h4>My Web Experience</h4>            
            <p>I don't have a lot of web design experience, but I do teach 
            introductory HTML/CSS as an extracurricular class to middle and high 
            school students. Admittedly, all that has really provided me is the 
            know how for what to use in any given situation. However, in regards 
            to any form of designing, that is where my experience is lacking, as 
            I have never really been in a position to push my design forward to 
            that next step.</p>
        
        <h4>My H1 Experience</h4>
            <p>The easy part of this homework, in my opinion, was knowing what 
            to use, where. This is because the majority of this material is what 
            I have shown my students as part of their coursework. What was hard 
            in this class was trying to push myself into better understanding 
            high quality design. One of the better ways to show materials to 
            younger students is to show off high contrast, vibrant colors that 
            don't really match particularly well. After a while, you tend to get 
            used to that and it overloads you. As for what I found valuable, I 
            have always been very interested in web applications, and I feel 
            that anything helping to push forward that skill is valuable in 
            itself.</p>
    
        <h4>My H2 Experience</h4>
            <p>The easy part of this homework, in my opinion, was being able to
            implement the JS and place the html inside of the JS. A large portion
            of this was completed using html to make sure it all looked as intended.
            The hard part was being able to fully understand the NavRouter. While
            it was super awesome that it was provided, I had to mess around with
            it quite extensively to get a better feel for what is going on. This
            entire exercise very valuable for me, as I have never worked on 
            anything regarding JS prior to this.</p>
    
    
        <h4>My H3 Experience</h4>
	    <p>The easy part of the this homework was being able to recreate the
            object, which was something I did previously for the Lab Assignment.
            The hard part was being able to create the object in a way I felt 
            made sense, as recipes are kind of an abstract object relative to 
            the previous examples of cars and employees. This is all very useful
            information though, as it allows me to get a better feel for JS as 
            an Object Oriented language.</p>
             

	<h4>Database</h4>
            <p>I have actually had previous databasing experience before using Oracle SQL.
	I am currently in the process of getting SQL certified, so a lot of the concepts
	were familiar to me due to them being things I have worked with prior.</p>
	
	<p>The difficult part of this homework was getting used to the visual aspect of
	MySQL. I never expected that to be the part I got caught up on the most, as the
	syntax itself wasn't really anything new for me. The easy part was databasing in
	general, as I have used a SQL databasing language prior to this. I think learning
	databasing in general is extremely important in the field, no matter what.</p>

	Click <a target="_blank" href='azadi_database.pdf'>here</a> to see my database document.
    
        <h4>Web API</h4>
            <p>I found the creation of the list object easy, as it was just a matter of 
        taking all fields in the database and converting them, so nothing super unique.
        I found getting everything to actually show up on the page difficult, as there
        were so many small details that kept on messing me up. Finally, I found the 
        conversion of the different data types confusing, as it was different than
        anything else I've done like that before
        Click <a target="_blank" href="docs/WebAPIErrors.pdf">here</a> to see my Web API error document 
    
        <h4>Click Sort</h4>
            <p>I found the organization of the json easy to navigate and create with the utilities. I have
            also used JSON a lot in the past, so it is not a new concept to me. The most difficult thing I encountered
            was merging together the search and clickSort utilities, it was a very delicate balance. This entire
            experience was incredibly useful do to never having truly encountered much of this.</p>
    
        <h4>Login</h4>
            <p>I'm going to be switching up the order of things I talk about this time aroud, starting with
            what I found hard. The hardest part of this lab was to get all of the links hooked up appropriately
            and ensuring that AJAX was working properly. The easy part was getting GetProfile and Logout to work once
            it was working properly on Logon. The entire exercise is useful because it helped me better understand
            the login process, which was one of the major factors for choosing this course.</p>    
    
        <h4>Insert</h4>
            <p>I found the use of SQL to be easy, as at this point we have managed to us it so often that it is "old news" by this point.
            The hardest part was getting everything hooked up appropriately, as I had a tunneling issue that prompted me to constantly
            reupload to the server, which got exhausting after a bit. Being able to have forms that access the database in a modular form
            is incredibly useful and is something I will be using on a regular basis whenever the need arises.</p>
    
        <h4>Update</h4>
            <p>I feel confident in saying this was proabbly the most difficult homework of them all. The easiest part was going back to some previous
            errors I had that needed to be fixed for this section to work, as I have a lot more experience under my belt compared to last time. The 
            hardest part was getting the updateOtherAPIs to work after getting the user to work, as they are somewhat different from each other in most
            regards and didn't translate over super well. Finally, the most useful part was getting everything running, becuase it was an example of having
            things work exactly as intended, and is nice to see as we approach the end of the semester.</p>
            <a href = "./docs/azadi_database.pdf">Click here for my database design</a>
    
        <h4>Delete</h4>
        <p>The easiest part of Delete was the SQL. By this point it has become second nature, so I am not particularly phased anymore. The hardest part was
        reverse engineering the delete call in DbMods, when everything else was returning or using data and this one was effectively a void method. The most
        useful part was implementing the whole thing, because now I have a full web app that allows for a little bit of everything!</p>
    
    


    `;
    
    var ele = document.createElement("div");
    ele.innerHTML = content;
    return ele;    
}