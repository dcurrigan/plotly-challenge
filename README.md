# plotly-challenge
Week 15 Plotly Homework

> Created by Dale Currigan  
> June 2021  
  
![Plotly](/Images/microbes.jpg)    

## Table of contents  
* [Project Intro](#Project-Intro)  
* [Project Structure](#Project-Structure)  
* [Setup](#Setup)  
* [Design](#Design)  
* [Contributors](#Contributors)  
* [Status](#Status)  

# Project Intro
The following project briefing was provided as an introduction to this assignment: 

*In this assignment, you will build an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels.*  
  
*The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare*.  



  
# Project Structure  
```
plotly-challenge   
|  
|    
|__ index.html                          # The site landing page html doc
|__ README.md                           # This file
|__ samples.json                        # The Bellybutton Biodiversity dataset 
|
|__ static/                              
|   |__css/                             # Directory for css stylesheets
|   |  |__ styles.css                              
|   |    
|   |__js/                              # Directory for javscript code
|      |__ app.js
|      
|__ Images/                             # Directory for image files
|   |__ microbes.jpg
|   |__ capture.jpg
|   |__ polar_coordinates.gif
|
``` 
  
# Setup 
  
* The site is can be accessed at: https://dcurrigan.github.io/plotly-challenge/
* The html for the site is all contained in index.html
* All styles are contained within static/css/style.css
* The javascript code enabling the functionality of the site is can be found within static/js/app.js
* The base dataset is found within samples.json   

# Design 
I've created an interactive dashboard that allows the user to explore the <a href="http://robdunnlab.com/projects/belly-button-biodiversity/">Bellybutton Biodiversity dataset. </a>. The user can select one of the test subject from the drop down menu and see that subjects data displayed in various visualisation.  
  
![Plotly](/Images/Capture.png)  
  
D3 and plotly were used to select and re-render page elements on chnage of dropdown menu item. D3.json() method was used to fetch the data, after which it could be filtered, mapped and sliced as required for Demographics Box, Bar Chart, Bubble Chart and Guage Chart.    
  
**Example:** Filter, Slice and Map to obtain the Top 10 sample_values, OTU_ID's and OTU_labels for the Bar chart
```
samples = baseData.samples.filter(subject => subject.id == selected)[0];
        
        sample_values  = samples.sample_values.slice(0, 10);
        otu_ids = samples.otu_ids.slice(0,10)
        otu_ids = otu_ids.map(id => "OTU-"+id)
        otu_labels = samples.otu_labels.slice(0,10)
```
  
The guage chart used the in-build Plotly Guage-mode indicator chart, but with the addition of a needle plotted as a second trace. This required application of some basic principles of trigonometry to determine the x and y coordinates of of the needle for each point on the guage. 

![Plotly](/Images/polar_coordinates.gif)  
  
Using the principle above:
```
x coordinate = radius x cos θ
y coordinate = radius x sin θ

where the radius is the needle length
```



   
# Contributors  
Dale Currigan  
[@dcurrigan](https://github.com/dcurrigan)  
<dcurrigan@gmail.com>


## Status
Project is: 
````diff 
+ Completed
````

