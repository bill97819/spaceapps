var checkPeople = function (lat, lng) {
    for (var i = 0; i < peopleData.features.length; i++){
        if ((Math.abs(peopleData.features[i].geometry.coordinates[0] - lng) <= 0.03) &&
            (Math.abs(peopleData.features[i].geometry.coordinates[1] - lat) <= 0.03)) {
            return true;
        }
    }
    return false;
};