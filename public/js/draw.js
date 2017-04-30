function MidPoint(x, y) {
    var sum = x + y;
    return (sum / 2);
}

function GetCellColour(north, east, south, west, callback) {
    var centerLat = MidPoint(north, south),
        centerLng = MidPoint(east, west);

    return createCell(centerLat, centerLng, callback);
}

var colour;

function initGrid(map, recs) {

    mapBounds = map.getBounds(),
        neBounds = mapBounds.getNorthEast(),
        swBounds = mapBounds.getSouthWest(),

        x1 = swBounds.lng(),
        x5 = neBounds.lng(),
        x3 = MidPoint(x1, x5),
        x2 = MidPoint(x1, x3),
        x4 = MidPoint(x3, x5),
        y1 = swBounds.lat(),
        y4 = neBounds.lat(),
        y2 = (y1 + ((y4 - y1) / 3)),
        y3 = (y1 + (((y4 - y1) / 3) * 2)),

        // Starting from the bottom left corner, going right
        lats = [x1, x2, x3, x4, x5],
        // Starting from the bottom left corner, going up
        longs = [y1, y2, y3, y4],
        count = 0;

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {

            var northBound = longs[j + 1],
                southBound = longs[j],
                eastBound = lats[i + 1],
                westBound = lats[i];
            GetCellColour(northBound, eastBound, southBound, westBound, function () {
                console.log("erwer:" + colour);
                recs[count] = new google.maps.Rectangle({
                    strokeColor: colour,
                    strokeOpacity: 0.5,
                    strokeWeight: 0,
                    fillColor: colour,
                    fillOpacity: 0.5,
                    map: map,
                    bounds: {
                        north: northBound,
                        south: southBound,
                        east: eastBound,
                        west: westBound
                    }
                });
                count++;
            });
        }
    }
}

function cleanupGrid(recs) {
    for (var i = 0; i < 12; i++) {
        recs[i].setMap(null);
    }
}