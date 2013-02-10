var DCURL="http://services.housing.berkeley.edu/FoodPro/dining/static/todaysentrees.asp"

function getRawHtml(url,onLoad,onFail=function(data){}){
	var data=null;
	$.ajax({
		url: url,
		type: 'GET',
		success: function(res) {
			data = res.responseText;
			onLoad(data);
		},
		failure: function(res){
			data="FAILURE";
			onFail(data);
		}
	});
}

function getLineArrayHtml(url, onLoad, onFail = function(data){}){
	getRawHtml(url,function(data){onLoad(toLineArray(data))},onFail);
}

function toLineArray(data){
	return data.split("\n");
}

function parser(input)
{
	crossroads_breakfast = meal(input, "pickMenu.asp?locationNum=01", "name=\"Breakfast\"");
	crossroads_lunch = meal(input, "pickMenu.asp?locationNum=01", "name=\"Lunch\"");
	crossroads_dinner = meal(input, "pickMenu.asp?locationNum=01", "name=\"Dinner\"");

	ckc_breakfast = meal(input, "pickMenu.asp?locationNum=04", "name=\"Breakfast\"");
	ckc_lunch = meal(input, "pickMenu.asp?locationNum=04", "name=\"Lunch\"");
	ckc_dinner = meal(input, "pickMenu.asp?locationNum=04", "name=\"Dinner\"");

	cafe_breakfast = meal(input, "pickMenu.asp?locationNum=03", "name=\"Breakfast\"");
	cafe_lunch = meal(input, "pickMenu.asp?locationNum=03", "name=\"Brunch\"");
	cafe_dinner = meal(input, "pickMenu.asp?locationNum=03", "name=\"Dinner\"");

	foothill_breakfast = meal(input, "pickMenu.asp?locationNum=06", "name=\"Breakfast\"");
	foothill_lunch = meal(input, "pickMenu.asp?locationNum=06", "name=\"Lunch\"");
	foothill_dinner = meal(input, "pickMenu.asp?locationNum=06", "name=\"Dinner\"");

	return {"Foothill":
		{"breakfast": foothill_breakfast, "lunch": foothill_lunch, "dinner": foothill_dinner},
		"CKC":
		{"breakfast": ckc_breakfast, "lunch": ckc_lunch, "dinner": ckc_dinner},
		"Cafe 3":
		{"breakfast": cafe_breakfast, "lunch": cafe_lunch, "dinner": cafe_dinner},
		"Crossroads":
		{"breakfast": crossroads_breakfast, "lunch": crossroads_lunch, "dinner": crossroads_dinner}}
}

function meal(input, place, type)
{
 
	var output = [];
	for(var i = 0; i < input.length; i++)
	{
		if((input[i].indexOf(place) != -1) && (input[i].indexOf(type) != -1))
		{
			for(var j = i + 1; (input[j].indexOf("<a href=") != -1); j++)
			{
				output.push(input[j].substring(input[j].indexOf("color=") + 16, input[j].length - 16));
			}
		}
	}
	return output;
}

function parserWrapper(data){
	var parsed=parser(data);
	console.log(parsed);
}

getLineArrayHtml(DCURL,parserWrapper);
