var checkRiver = function (lat, lng) {
    for (var i = 0; i < riverData.features.length; i++) {
        for (var j = 0; j < riverData.features[i].geometry.coordinates.length; j++) {
            if ((Math.abs(riverData.features[i].geometry.coordinates[j][0] - lng) <= 0.03) &&
                (Math.abs(riverData.features[i].geometry.coordinates[j][1] - lat) <= 0.03)) {
                return true;
            }
        }
    }
    return false;
};

var checkPeople = function (lat, lng) {
    for (var i = 0; i < peopleData.features.length; i++) {
        if ((Math.abs(peopleData.features[i].geometry.coordinates[0] - lng) <= 0.03) &&
            (Math.abs(peopleData.features[i].geometry.coordinates[1] - lat) <= 0.03)) {
            return true;
        }
    }
    return false;
};

var rainPercentage = 0.00;
var checkRain = function (lat, lng) {
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: "https://api.darksky.net/forecast/d78b68e20188c0d37a35597c4208d834/" + lat + "," + lng,
        success: function (result){
            rainPercentage = result.currently.precipProbability.toFixed(2);
            console.log("Chance of rain: " + rainPercentage);
        }
    });
};

var createCell = function (lat, lng) {
    //get data
    var isNearRiver = checkRiver(lat, lng);
    var isNearPeople = checkPeople(lat, lng);
    checkRain(lat, lng);
    console.log("Lat: " + lat);
    console.log("Lng: " + lng);
    console.log("Near river: " + isNearRiver);
    console.log("Near people: " + isNearPeople);
    //create cell
    
};