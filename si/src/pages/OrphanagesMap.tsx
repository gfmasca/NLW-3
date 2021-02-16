import React from 'react';

import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import {
  MapContainer, TileLayer,
} from 'react-leaflet';

import '../styles/pages/orphanages-map.css';

import mapMakerImg from '../images/map_marker.svg';

const OrphanagesMap: React.FC = () => (
  <div id="page-map">
    <aside>
      <header>
        <img src={mapMakerImg} alt="Happy" />

        <h2>Escolha um orfanato no mapa</h2>
        <p>Muitas crianças estão esperando a sua visita :)</p>
      </header>

      <footer>
        <strong>Vila Mariana</strong>
        <span>São Paulo</span>
      </footer>
    </aside>

    <MapContainer
      center={[-23.5916201, -46.6222736]}
      zoom={15}
      style={{ width: '100%', height: '100%' }}
    >
      {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
      />

    </MapContainer>

    <Link to="/orphanages/create" className="create-orphanage">
      <FiPlus size="32" color="#fff" />
    </Link>
  </div>
);

export default OrphanagesMap;
