# Proposal

## What will (likely) be the title of your project?

CryptoSentry
## In just a sentence or two, summarize your project. (E.g., "A website that lets you buy and sell stocks.")

A background .exe that will monitor the cryptocurrency market and text you if there is a notable dip or rise in the market.

## In a paragraph or more, detail your project. What will your software do? What features will it have? How will it be executed?

My software will monitor the rest API of the World Coin Index (WCI) with a key you provide (free to obtain). It will then parse out the .json and pull out pertinent information about all cryptocurrenciesm monitored by the WCI, and allow you to select currencies to watch. By selecting these coins to watch, you can also designate a minimum and maximum value for it to fluctuate between. If it ever reaches above the maximum, or below the minimum, the software will then text you about the development. There are many stretch goals to be implemented, such as a constant monitoring of BTC trends as well as an implementation of a volume minimum and maximum, but the likelihood of completing them by the project's end date is unknown.

## If planning to combine 1051's final project with another course's final project, with which other course? And which aspect(s) of your proposed project would relate to 1051, and which aspect(s) would relate to the other course?

NA

## If planning to collaborate with 1 or 2 classmates for the final project, list their names, email addresses, and the names of their assigned TAs below.
NA

## In the world of software, most everything takes longer to implement than you expect. And so it's not uncommon to accomplish less in a fixed amount of time than you hope.

### In a sentence (or list of features), define a GOOD outcome for your final project. I.e., what WILL you accomplish no matter what?

-succesful monitoring of the WCI rest API
-A list of all monitored cryptocurrencies that have been retrieved by a .json parser
-a working display that allows for input and storage of desired values to be monitored, saved to the particular cryptocurrency.

### In a sentence (or list of features), define a BETTER outcome for your final project. I.e., what do you THINK you can accomplish before the final project's deadline?
-Fully implemented SMS capabilities that are able send emails to Verizon customers that are then sent to their phones as texts.
-initial framework for monitoring the BTC trend and ability to recognize if it's a positive or negative trend
-storage of change in volume of monitored cryptocurrencies


### In a sentence (or list of features), define a BEST outcome for your final project. I.e., what do you HOPE to accomplish before the final project's deadline?
-Fully implemented BTC trend monitoring
-Fully implemented volume monitorting
-Ability to send SMS to more cell phone services

## In a paragraph or more, outline your next steps. What new skills will you need to acquire? What topics will you need to research? If working with one of two classmates, who will do what?
This program will be written in C#, a language I am semi-comfortable working with. This program effectively has 4 sections with varying difficulty and novelty: getting an asynchronous API call (difficult and new), designing a winform to provide data to the user (tedious, but comfortable), acquiring and utilizing a .json parser(moderate and new), and finally notifying the user by SMS (difficult and new). 

New skills I need to acquire is utilizing multiple classes and taking it all through a facade for proper management and protection, as well as getting used to utilizing pre-made libraries in C#. I have previously made an HTML parser for practice reasons, and hwen I found out Newtonsoft has a json parser I leapt at the opportunity (it's usage will also be denoted in my code. Other skills I need to develop is successfully having an asynchronous task running (a skill I previously tried and failed at), as well and creating a user friendly window that others are capable of using rather than just a personalized window with no labelling.

I am going to be researching various topics and libraries to make this project work, specifically methods to succesfully have an asynchronous call run without freezing my program in the process, methods in the NewtonSoft .json parser, and methods to send SMS to Verizon, as well as other carriers.
