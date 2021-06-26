// Select the subject selection dropdown menu
var dropDown = d3.select("#selDataset")

// Define the location of the samples datasetS
const url = 'samples.json';

// Trigger an update of the dashboard when the dropdown selection is changed
d3.selectAll("#selDataset").on("change", optionChanged);

// Renders data on initial page load
function loadData() {
    // Fetch the JSON data from samples.json
    d3.json(url).then(function(data) {
            
        subject_ids = data.metadata.map(row => row['id']); // the 'id' key 
        
        // Add the id's 
        d3.select("#selDataset")
        .selectAll('myOptions')
        .data(subject_ids)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the dropdown
        .attr("value", function (d) { return d; }) // corresponding value returned by the dropdown
    
        
        // Set the default value of the drop down to first item in subject_ids list
        d3.select("#selDataset").property("value", subject_ids[0])
        
        // Run optionChanged to fill the page with data for the first item in the dropdown
        optionChanged()
    });

    
};

// Renders data for the currently selected subject
function optionChanged() {   

    // Get which subject is currently selected
    var selected = dropDown.property("value");
        
    // Fetch the JSON data from samples.json
    d3.json(url).then(function(data) {
     
        baseData = data
        
        // DEMOGRAPHICS TABLE //
        ///////////////////////
        
        // metadata for currently selected subject
        demographics = data.metadata.filter(subject => subject.id == selected);
        demographics = demographics[0]
        
        // clear the demographics box
        d3.select("#sample-metadata").html("")
        
        // fill with data for the currently selected subject
        Object.entries(demographics).forEach(function([key, value]) {
            return d3.select('#sample-metadata')
                     .append()
                     .html(key + ": " + value + "<br>" )
                     .style("font-size","12px")
                     .style("font-weight",function(d,i) {return i*600+600;})
        }) 
        

        //     BAR GRAPH      //
        ///////////////////////

        // samples for currently selected subject
        samples = data.samples.filter(subject => subject.id == selected)[0];
        
        sample_values  = samples.sample_values.slice(0, 10);
        otu_ids = samples.otu_ids.slice(0,10)
        otu_ids = otu_ids.map(id => "OTU-"+id)
        otu_labels = samples.otu_labels.slice(0,10)

        var trace = {
            x: sample_values,
            y: otu_ids,
            type: 'bar',
            orientation: 'h',
            text: otu_labels,
            marker: {
                color: ["#0c3383", "#208fad", "#89b173", '#d4c949', "#f2ca38", "#f2b938", "#f18b37", "#ec7532", "#df3b25", "#d91e1e"]
            }
        }

        var data = [trace]

        var layout = {
            title: "<b>Top Bacterial Culture Results</b>",
            xaxis:{
                    side:'left'
                },
            yaxis:{
                autorange:'reversed'
                },
            margin: {
              l: 100,
              r: 100,
              t: 60,
              b: 20
            }
        }
        
        Plotly.newPlot("bar", data, layout)


        //    BUBBLE CHART    //
        ///////////////////////

        // samples for currently selected subject
        console.log(data[0])  
        samples = baseData.samples.filter(subject => subject.id == selected)[0];
        
        sample_values  = samples.sample_values;
        otu_ids = samples.otu_ids;
        otu_labels = samples.otu_labels

        var trace = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            marker: {
              size: sample_values,
              sizeref: 1.2,
              color: otu_ids,
              colorscale: 'Portland'
            },
            text: otu_labels
          };
          
          var data = [trace];
          
          var layout = {
            title: '<b>Organisms Found and their Relative Abundance</b>',
            showlegend: false,
            height: 600,
            width: 1300,
            xaxis: {title: "OTU ID"},
            yaxis: {title: "Sample Value"}
          };
          
          Plotly.newPlot('bubble', data, layout);


        //    GAUGE CHART    //
        ///////////////////////
        
        // get number of washes per week for currently selected subject
        samples = baseData.metadata.filter(subject => subject.id == selected)[0]
        scrubs = samples.wfreq
                
        
        // Trace for guage chart     
        var guageTrace = {
            domain: { x: [0, 1], y: [0, 1] },
            value: scrubs,
            gauge: { 
                axis: {
                    range: [null, 9], 
                    tickvals: [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5],
                    ticktext: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
                    ticks: 'inside',
                }, 
                thickness: 10,
                bar: {thickness: 0}, // hide the inner bar
                steps: [
                    { range: [0, 1], color: "#0c3383" },
                    { range: [1, 2], color: "#208fad" },                       
                    { range: [2, 3], color: "#89b173" },
                    { range: [3, 4], color: "#f2ca38" },
                    { range: [4, 5], color: "#f2b938" },
                    { range: [5, 6], color: "#f18b37" },
                    { range: [6, 7], color: "#ec7532" },
                    { range: [7, 8], color: "#df3b25" },
                    { range: [8, 9], color: "#d91e1e" }
                ]},
            title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week" },
            type: "indicator",
            mode: "gauge"
            };

        // Trace for the circle at the hub of the needle     
        var circleTrace = {
            type: 'scatter',
            x: [0.5],  // x-coordinate for the marker
            y: [0.20], // y-coordinate for the marker
            marker: {
              size: 18,
              color:'#850000'
            },
            showlegend: false,
            hoverinfo: "skip"
          }

        
        // Needle Adjustment 
        // as the 'zero' point is actually (0.5, 0.2) an adjustment needs to be made to the 
        // calculated needle X and Y values 
        var adjustAx, adjustBx, adjustY

        if (scrubs == 1 || scrubs == 2 || scrubs == 3 || scrubs == 4 || scrubs == 5 || Number.isInteger(scrubs) == false) {
            adjustAx = 0.49;
            adjustBx = 0.51;
            adjustY = 0.20;
        } else if (scrubs == 6 || scrubs == 7 || scrubs == 8 || scrubs == 9){
            adjustAx = 0.48;
            adjustBx = 0.51;
            adjustY = 0.20;
        } else if (scrubs == null || scrubs == 0){
            adjustAx = 0.49;
            adjustBx = 0.51;
            adjustY = 0.19;
        }

        // Needle Calculation
        var degrees = 180 - (20 * scrubs);        // 20 degrees for each of the 9 gauge sections
        var radius = 0.35;                        // the length of the guage needle 
        var radians = degrees * Math.PI / 180;    // convert the degrees to radians to use with sin and cos function
        
             
        // Convert polar to cartesian coordinates ( x= radius x cos(θ) and y= radius sin(θ), radius is length of needle )
        // A and C are the base (length 0.02), C is the point of the triangle        
        
        var Ax = 0.01 * Math.cos(radians ) + adjustAx;
        var Ay = 0.01 * Math.sin(radians) + adjustY;
        var Bx = 0.01 * Math.cos(radians) + adjustBx;
        var By = 0.01 * Math.sin(radians) + (adjustY+0.01);
        var Cx = radius * Math.cos(radians) + 0.5;
        var Cy = radius * Math.sin(radians) + 0.2;
         
        // Draw a triangle to make the guage
        // M - moves the 'cursor', L draws a line, Z closes the path 
        // A, B, C are the three points of the triangle, with coordinates x and y


        var path = 'M ' + Ax + ' ' + Ay +
                   ' L ' + Bx + ' ' + By +
                   ' L ' + Cx + ' ' + Cy +
                   ' Z';
  
        // Layout for the guage
        var gaugeLayout = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '#850000',
            line: {
                color: '#850000'
            }
            }],  
            width: 600,
            height: 500,
            xaxis:  
                {zeroline:false, 
                showticklabels:false,
                showgrid: false, 
                range: [0, 1],
                fixedrange: true
                },
            yaxis: {
                zeroline:false, 
                showticklabels:false,
                showgrid: false, 
                range: [0, 1],
                fixedrange: true
                }
        };

        // Plot the guage
        data = [guageTrace, circleTrace]

        Plotly.newPlot('gauge', data, gaugeLayout);

    });


    
}

loadData()


