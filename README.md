# plotly-challenge
Week 15 Plotly Homework

> Created by Dale Currigan  
> June 2021  
  
![Plotly](/static/images/ufo.jpg)    

## Table of contents  
* [Project Intro](#Project-Intro)  
* [Project Structure](#Project-Structure)  
* [Setup](#Setup)  
* [Design](#Design)  
* [Contributors](#Contributors)  
* [Status](#Status)  

# Project Intro
*WAKE UP SHEEPLE! The extra-terrestrial menace has come to Earth and we here at ALIENS-R-REAL have collected all of the eye-witness reports we could to prove it! All we need to do now is put this information online for the world to see and then the matter will finally be put to rest.*  
  
*There is just one tiny problem though... our collection is too large to search through manually. Even our most dedicated followers are complaining that they are having trouble locating specific reports in this mess.*  
  
*That's why we are hiring you. We need you to write code that will create a table dynamically based upon a dataset we provide. We also need to allow our users to filter the table data for specific values. There's a catch though... we only use pure JavaScript, HTML, and CSS, and D3.js on our web pages. They are the only coding languages which can be trusted.*  
  
*You can handle this... right? The planet Earth needs to know what we have found!*  
  
  
# Project Structure  
```
javascript-challenge   
|  
|    
|__ index.html                          # The site landing page html doc
|__ README.md                           # This file
|
|__ static/                              
|   |__css/                             # Directory for css stylesheets
|   |   |__ styles.css                              
|   |    
|   |__js/                              # Directory for javscript code
|   |  |__ app.js
|   |  |__ data.js
|   |   
|   |__images/                          # Directory for image files
|   |  |__ nasa.jpg
|   |  |__ ufo.jpg
|   |  |__ ufo.svg
|
|__ Resources/                          # Directory for screen captures for Readme
|   |__ Capture1.png                  
|   |__ Capture2.png           
|   |__ Capture3.png           
|   |__ Capture4.png           

``` 
  
# Setup 
  
* The site is can be accessed at: https://dcurrigan.github.io/javascript-challenge/
* The html for the site is all contained in index.html
* All styles are contained within static/css/style.css
* The javascript code enabling the functionality of the site is can be found within static/js/app.js
* The base dataset is found within static/js/data.js   

# Design 
The site includes a splash screen that welcomes the user and sets the atmosphers to the site 

![Javascript](/resources/Capture2.png)  
  
Iteration and a series of nested If Statements are used to filter the data while still allowing the user to leave certain fileds blank as 'wildcards'  
  
  
```
for (i=0; i<tableData.length; i++) {  
  
    // filter by date   
    if ((tableData[i].datetime == dateValue) || (dateValue == "") ) {  
  
        // filter by city   
        if ((tableData[i].city == cityValue) || (cityValue == "any") || (cityValue == "")) {  
  
            //filter by state  
            if ((tableData[i].state == stateValue) || (stateValue == "any") || (stateValue == "")) {  
  
                //filter by country  
                if ((tableData[i].country == countryValue) || (countryValue == "Any") || (countryValue == ""))  {  
  
                    //filter by shape  
                    if ((tableData[i].shape == shapeValue) || (shapeValue == "Any") || (shapeValue == "")) {  
                        filtered.push(tableData[i]);  
```
  
If the search returns a positive result the table data is displayed:  

![Javascript](/resources/Capture1.png)  
  
By entering more search terms, the data is filtered further: 
  
![Javascript](/resources/Capture3.png)  
  
If no corresponding entries are found a 'No match' response is recieved:  
  
![Javascript](/resources/Capture4.png)  


 
   
# Contributors  
Dale Currigan  
[@dcurrigan](https://github.com/dcurrigan)  
<dcurrigan@gmail.com>


## Status
Project is: 
````diff 
+ Completed
````

