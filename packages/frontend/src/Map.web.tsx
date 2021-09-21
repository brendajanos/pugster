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
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
      onLocationChange(lng, lat, zoom);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={mapContainer} style={{flex: 1}} />;
};

export default Map;
