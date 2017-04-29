$(function () {
    var getPoints = function () {
        return [
          new google.maps.LatLng(10, 10),
          new google.maps.LatLng(10.00011, 10.100102),
          new google.maps.LatLng(10.010210, 10.02301),
          new google.maps.LatLng(10.03030213, 10.13030),
       ];
    };

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 10,
            lng: 10
        },
        zoom: 10
    });

    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map
    });

    createCell(37.8267,-100);
});