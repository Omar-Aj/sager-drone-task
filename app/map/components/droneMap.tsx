import { PropsWithChildren } from "react";
import Map, { Popup } from "react-map-gl/mapbox";

interface PropsType extends PropsWithChildren {
  viewPort: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  setViewPort: (viewPort: any) => void;
  selectedDrone: Drone | null;
  setSelectedDrone: (drone: Drone | null) => void;
}

export default function DroneMap({
  children,
  viewPort,
  setViewPort,
  selectedDrone,
  setSelectedDrone,
}: PropsType) {
  const selectedDroneLong = selectedDrone?.features[0].geometry.coordinates[0];
  const selectedDroneLat = selectedDrone?.features[0].geometry.coordinates[1];

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      {...viewPort}
      onMove={(event) => {
        setViewPort(event.viewState);
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
      mapStyle="mapbox://styles/mapbox/dark-v11?optimize=true"
    >
      {children}
      {selectedDrone && (
        <Popup
          longitude={selectedDroneLong!}
          latitude={selectedDroneLat!}
          closeOnMove={false}
          closeButton={false}
          closeOnClick={false}
          onClose={() => setSelectedDrone(null)}
          anchor="bottom"
        >
          <h4 className="mb-2.5 font-bold">
            {selectedDrone.features[0].properties.Name}
          </h4>
          <div className="grid grid-cols-2 justify-items-center text-xs">
            <p>Altitude</p>
            <p>Flight Time</p>
            <p>{selectedDrone.features[0].properties.altitude}</p>
            <p>00:25:45</p>
          </div>
        </Popup>
      )}
    </Map>
  );
}
