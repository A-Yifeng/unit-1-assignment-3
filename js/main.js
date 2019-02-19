/* Yifeng Ai
Geog 575
Assignment 2
*/

/* My comments for the code are all added with '/*' sign to distinguish from original comments.
Comments for fixing the bugs are all placed below the corresponding line of code, and comments for the functionality 
of each line of code are all placed above the corresponding line of code.*/

//initialize function called when the script loads
function initialize(){
	console.log('1st init')
	cities();
	console.log('2nd init')
	debugAjax();
};

//function to create a table with cities and their populations
function cities(){
	//define two arrays for cities and population
	var cityPop = [
		{ 
			city: 'Madison',
			population: 233209
		},
		{
			city: 'Milwaukee',
			population: 594833
		},
		{
			city: 'Green Bay',
			population: 104057
		},
		{
			city: 'Superior',
			population: 27244
		}
	];

	//append the table element to the div
	$("#mydiv").append("<table>");

	//append a header row to the table
	$("table").append("<tr>");
	
	//add the "City" and "Population" columns to the header row
	$("tr").append("<th>City</th><th>Population</th>");
	
	//loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        //assign longer html strings to a variable
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        //add the row's html string to the table
        $("table").append(rowHtml);
    };
    /* After adding the basic contents for the table, the program calls the addColumns() function with cityPop
    as the parameter.*/
    addColumns(cityPop);
    /* After adding city size info to the html table, the program calls the addEvents() function with no 
    parameter to apply the functionality of addEventListener to the whole table. */
    addEvents();
};

function addColumns(cityPop){
    /* Loop through each tr element(table row) and append city size info to the end of each table row 
    per info given by cityPop.population for each row. */
    $("tr").each(function(i){
    	
    	if (i == 0){
    		/* Add table header for city size when the loop is iterating the first row of the table.*/
    		$(this).append("<th>City Size</th>");
    		/* Bug above is fixed by correcting 'apend' to 'append'*/
    	} else {
    		/* Determine the value to be assigned to citySize per value in cityPop.population */
    		var citySize;
    		/* citySize is small when population < 100 thousand, otherwise middle if < 500 thousand, otherwise large*/
    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';

    		} else if (cityPop[i-1].population < 500000){
				citySize = 'Medium';
				/* Bug above is fixed by changing citysize to citySize.*/
    		} else {
    			citySize = 'Large';
    		};
    		/* Append actual citySize to the end of each row. */
    		$(this).append('<td>' + citySize + '</td>');
    		/* Bug above is fixed by adding a '>' to the opening td tag.*/
    	};
    });
};

function addEvents(){

	$('table').mouseover(function(){
		/* Bug above is fixed by deleting the '#' sign before table-- the table is not the id, but the actual name
		of the tag. */
		
		/* Declare a new color string starting with 'rgb(' each time the inline function is called.*/
		var color = "rgb(";

		for (var i=0; i<3; i++){
			/* Generate random value representing color (0-255) to fill in the color string in the order of R-G-B*/
			var random = Math.round(Math.random() * 255);

			color += random;
			/* Bug above is fixed by deleting the '' around random.*/

			/* If the program is appending Red and Green, add ',' to the end of the color string, otherwise add
			')' to complete writing the color string. */
			if (i<2){
				color += ",";

			} else {
				color += ")";
		};
		/* Change the color of the text of the entire table per color string. */
		$('table').css('color', color);

		}
	});
	/* Bug above is fixed by changing ')' and '}' to correspond to the opening parenthesis and curly bracket */

	/* The clickme() function is called, and the alert is shown. */
	function clickme(){

		alert('Hey, you clicked me!');
	};

	/* Call the clickme() function when the user clicks anywhere on the html table displayed on the webpage. */
	$('table').on('click', clickme);
};


function debugAjax(){
    /* declare function debugAjax that reads in data from MegaCites.geojson */
    var mydata;

    /* jQuery AJAX request*/
    $.ajax("data/MegaCities.geojson", {
        dataType: "json",
        /* in case that the response of the ajax request is received, an inline function with response as parameter is called */
        success: function(response){
        	/* assign the value of response to mydata */
            mydata = response;
            /* call the callback function */
            debugCallback(mydata)
            /* mydata should have value as it is logged inside function */
            console.log(mydata)
        }
    });

    /* Because the script did not wait for response from the ajax request, but instead went on executing these following
    code, 'mydata' is not assigned any value, and thus in console is logged 'undefined', and 'GeoJSON data:' is not followed
    by anything. */
    console.log(mydata)
    $(mydiv).append('<br>GeoJSON data:<br>' + JSON.stringify(mydata));
};


function debugCallback(mydata){
    
    /* assign the value to 'mydiv' to be displayed through html */
    $(mydiv).append('<br>GeoJSON data:<br>' + JSON.stringify(mydata));

};



//call the initialize function when the document has loaded
$(document).ready(initialize);