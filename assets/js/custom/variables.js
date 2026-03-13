/**
 * variables
 */
const isMobile = navigator.userAgent.match(/Mobile/i) == "Mobile";

const siteCookieDomain = "."+document.location.hostname.replace("www.","");
const cookieParamsAdd = {
    expires: 356,
    path: "/",
    secure: false
};
const cookieParamsRemove = {
    expires: -1,
    path: "/",
    secure: false
};
// const mapIcon = '/assets/img/pointer.png';
const mapStyle = [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            { "saturation": "-100" }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            { "visibility": "on" },
            { "color": "#b4c1d2" }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            { "color": "#666666" }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            { "visibility": "off" }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            { "saturation": -100 },
            { "lightness": 65 },
            { "visibility": "on" }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            { "color": "#ffffff" }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            { "color": "#f5f5f5" }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            { "saturation": -100 },
            { "lightness": "50" },
            { "visibility": "simplified" }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            { "color": "#e8eef5" }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            { "color": "#888888" }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
            { "visibility": "off" }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            { "saturation": "-100" }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            { "color": "#ffffff" }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            { "color": "#e0e6ed" }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            { "color": "#666666" }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            { "color": "#c4d1e1" }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            { "color": "#555555" }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            { "lightness": "30" }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            { "lightness": "40" }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            { "saturation": -100 },
            { "visibility": "simplified" }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            { "color": "#c4d1e1" }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            { "color": "#888888" }
        ]
    }
];
