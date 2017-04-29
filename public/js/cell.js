var createCell = function (lat, lng) {
    //get data
    var isNearRiver = checkRiver(lat,lng);
    alert(isNearRiver);
    var isNearPeople = checkPeople(lat,lng);
    alert(isNearPeople);
    //create cell
    
};


