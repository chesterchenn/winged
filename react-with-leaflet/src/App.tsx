import React, { useRef, useState, useEffect } from 'react';
import L, { ControlOptions, Map as LeafMap, TileLayer, Control, control } from 'leaflet';
import LeafletRetinaIconUrl from 'leaflet/dist/images/marker-icon-2x.png';
import LeafletIconUrl from 'leaflet/dist/images/marker-icon.png';
import LeafletShadowIconUrl from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: LeafletIconUrl,
  iconRetinaUrl: LeafletRetinaIconUrl,
  shadowUrl: LeafletShadowIconUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const App = (): JSX.Element => {
  const [currentMap, setCurrentMap] = useState<LeafMap | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [control, setControl] = useState();
  const mapContainerRef = useRef(null);

  const [titleLayer] = useState(
    new TileLayer(
      `https://a.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=${process.env.ACCESS_TOKEN}`,
      {
        maxZoom: 25,
      },
    ),
  );

  L.Control.CustomControl = Control.extend({
    options: {
      position: 'topleft',
    },
    onAdd: function () {
      this._container = L.DomUtil.create('div', 'custom-control');
      this._button = L.DomUtil.create('button', 'custom-control-ui');
      this._button.innerHTML = open ? '关闭' : '打开';
      L.DomEvent.addListener(this._container, 'click', L.DomEvent.stopPropagation)
        .addListener(this._container, 'click', L.DomEvent.preventDefault)
        .addListener(this._container, 'click', function () {
          setOpen(!open);
        });
      this._container.appendChild(this._button);
      return this._container;
    },
    onRemove: function () {
      this._container.remove();
    },
  });

  useEffect(() => {
    if (!mapContainerRef.current) {
      return;
    }

    const map = new LeafMap(mapContainerRef.current);

    map.setView([23.73, 114.7], 15);
    setCurrentMap(map);
  }, []);

  useEffect(() => {
    if (control) {
      control.onRemove();
    }
    if (currentMap) {
      const control = new L.Control.CustomControl({
        onClick: () => {
          setOpen(!open);
        },
      }).addTo(currentMap);
      setControl(control);
    }
  }, [currentMap, open]);

  useEffect(() => {
    currentMap?.addLayer(titleLayer);
  }, [titleLayer, currentMap]);

  return (
    <>
      <div ref={mapContainerRef} style={{ height: '800px' }}></div>
    </>
  );
};

export default App;
