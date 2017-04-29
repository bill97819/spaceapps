$(function () {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 43.4668000,
            lng: -80.5163900
        },
        zoom: 14
    });
    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map
        
    });
    function getPoints() {
        return [
          new google.maps.LatLng(43.4668000, -80.5163900),
          new google.maps.LatLng(43.4668000, -80.5163900),
          new google.maps.LatLng(43.4668000, -80.5163900),
          new google.maps.LatLng(43.4668000, -80.5163900),
          new google.maps.LatLng(43.4668000, -80.5163900),
       ];
    }
});