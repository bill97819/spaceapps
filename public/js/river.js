var checkRiver = function (lat, lng) {
    for (var i = 0; i < riverData.features.length; i++){
        for (var j = 0; j < riverData.features[i].geometry.coordinates.length; j++) {
            if ((Math.abs(riverData.features[i].geometry.coordinates[j][0] - lng) <= 0.03) &&
                (Math.abs(riverData.features[i].geometry.coordinates[j][1] - lat) <= 0.03)) {
                return true;
            }
        }
    }
    return false;
};