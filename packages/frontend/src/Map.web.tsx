import mapboxgl from '!mapbox-gl';
import React, {useRef, useState, useEffect, FC} from 'react';

mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

interface IProps {
  initialLng: number;
  initialLat: number;
  initialZoom: number;
  onLocationChange: (lng: number, lat: number, zoom: number) => void;
}

const Map: FC<IProps> = props => {
  const {initialLng, initialLat, initialZoom, onLocationChange} = props;
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map>(null);
  const [lng, setLng] = useState(initialLng);
  const [lat, setLat] = useState(initialLat);
  const [zoom, setZoom] = useState(initialZoom);

  useEffect(() => {
    if (map.current) {
      return;
    } // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.on('load', () => {
      map.current.addLayer({
        id: 'locations',
        type: 'circle',
        /* Add a GeoJSON source containing place coordinates and information. */
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [19.040528307070645, 47.50637626996388],
                },
                properties: {
                  name: 'Luigi',
                  imageSrc: 'something',
                },
              },
            ],
          },
        },
      });
    });
    map.current.on('move', () => {
      let lngCurrent = map.current.getCenter().lng.toFixed(4);
      let latCurrent = map.current.getCenter().lat.toFixed(4);
      let zoomCurrent = map.current.getZoom().toFixed(2);
      setLng(lngCurrent);
      setLat(latCurrent);
      setZoom(zoomCurrent);
      onLocationChange(lngCurrent, latCurrent, zoomCurrent);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={mapContainer} style={{flex: 1}} />;
};

export default Map;
