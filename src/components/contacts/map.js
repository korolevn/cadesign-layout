import placemarkImage from "../../assets/images/placemark.svg";

const center = [56.99416694376941, 40.977366266864784];
const placemarkCenter = [56.99449168982364, 40.97729911439944];

function init() {
  const map = new ymaps.Map("map", {
    center,
    zoom: 19,
  });

  const placemark = new ymaps.Placemark(placemarkCenter, {}, {
    iconLayout: "default#image",
    iconImageHref: placemarkImage,
    iconImageSize: [120, 120],
    iconImageOffset: [-19, -44],
  });

  map.controls.remove("geolocationControl");
  map.controls.remove("searchControl");
  map.controls.remove("trafficControl");
  map.controls.remove("typeSelector");
  map.controls.remove("fullscreenControl");
  map.controls.remove("zoomControl");
  map.controls.remove("rulerControl");
  map.behaviors.disable(["scrollZoom"]);

  map.geoObjects.add(placemark);
}

ymaps.ready(init);
