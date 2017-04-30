function MidPoint(x, y) {
    var sum = x + y;
    return (sum / 2);
}

function GetCellColour(north, east, south, west) {
    var centerLat = MidPoint( north, south ),
        centerLng = MidPoint( east, west );
    
    return createCell(centerLat, centerLng);
}

function initGrid(map, recs) {
    
        var cellColour = '#000000',
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
        lats = [ x1, x2, x3, x4, x5],
        // Starting from the bottom left corner, going up
        longs = [y1, y2, y3, y4],            
            count = 0;
    
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 3; j++){
                
                var cellColour = PercentToColour(1);
                
                recs[count] = new google.maps.Rectangle({
                    strokeColor: cellColour,
                    strokeOpacity: 0.5,
                    strokeWeight: 0,
                    fillColor: cellColour,
                    fillOpacity: 0.5,
                    map: map,
                    bounds: {
                        north: longs[j+1],
                        south: longs[j],
                        east: lats[i+1],
                        west: lats[i]
                    }
                });
                count++;
                
            }
        }
    
    }

function cleanupGrid(recs) {
    for (var i = 0; i < 12; i++) {
        recs[i].setMap(null);
    }
}
        
            