var checkRiver = function (lat, lng) {
    for (var i = 0; i < riverData.features.length; i++) {
        for (var j = 0; j < riverData.features[i].geometry.coordinates.length; j++) {
            if ((Math.abs(riverData.features[i].geometry.coordinates[j][0] - lng) <= 0.03) &&
                (Math.abs(riverData.features[i].geometry.coordinates[j][1] - lat) <= 0.03)) {
                return 1;
            }
        }
    }
    return 0;
};

var checkPeople = function (lat, lng) {
    for (var i = 0; i < peopleData.features.length; i++) {
        if ((Math.abs(peopleData.features[i].geometry.coordinates[0] - lng) <= 0.03) &&
            (Math.abs(peopleData.features[i].geometry.coordinates[1] - lat) <= 0.03)) {
            return 1;
        }
    }
    return 0;
};

var rainPercentage = 0.00;
var checkRain = function (lat, lng, callback) {
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: "https://api.darksky.net/forecast/d78b68e20188c0d37a35597c4208d834/" + lat + "," + lng,
        success: callback
    });
};

var hex = function (x) {
    x = x.toString(16);
    return (x.length == 1) ? '0' + x : x;
};

var getHex = function (risk) {
    var ratio = risk % 1;
    var floor = Math.floor(risk);
    var color1 = "00FF00";
    var color2 = "00FF00";
    if (floor == 1) {
        color2 = "FFFF00";
    } else if (floor == 2) {
        color1 = "FFFF00";
        color2 = "FF0000";
    }
    var r = Math.ceil(parseInt(color1.substring(0, 2), 16) * ratio + parseInt(color2.substring(0, 2), 16) * (1 - ratio));
    var g = Math.ceil(parseInt(color1.substring(2, 4), 16) * ratio + parseInt(color2.substring(2, 4), 16) * (1 - ratio));
    var b = Math.ceil(parseInt(color1.substring(4, 6), 16) * ratio + parseInt(color2.substring(4, 6), 16) * (1 - ratio));

    return hex(r) + hex(g) + hex(b);
};

var createCell = function (lat, lng, callback) {
    //get data
    var isNearRiver = checkRiver(lat, lng);
    var isNearPeople = checkPeople(lat, lng);
    checkRain(lat, lng, function (result) {
        rainPercentage = result.currently.precipProbability.toFixed(2);
        var risk = parseFloat(isNearRiver) + parseFloat(isNearPeople) + parseFloat(rainPercentage);
        colour = getHex(risk);
        console.log("Lat: " + lat);
        console.log("Lng: " + lng);
        console.log("Near river: " + isNearRiver);
        console.log("Near people: " + isNearPeople);
        console.log("Risk of rain: " + rainPercentage);
        console.log("Risk of flood: " + risk);
        console.log("Colour: " + colour);
        callback();
    });
};