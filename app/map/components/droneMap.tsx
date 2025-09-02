import { PropsWithChildren } from "react";
import Map, { Popup } from "react-map-gl/mapbox";

interface PropsType extends PropsWithChildren {
  viewPort: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  setViewPort: (viewPort: any) => void;
  selectedDrone: TrackedDrone | null;
  setSelectedDrone: (drone: TrackedDrone | null) => void;
}

const formatDuration = (timestamp: number): string => {
  const now = new Date();
  const startTime = new Date(timestamp);
  const diffMs = now.getTime() - startTime.getTime();

  const hours = Math.floor(diffMs / 3_600_000);
  const minutes = Math.floor((diffMs % 3_600_000) / 60_000);
  const seconds = Math.floor((diffMs % 60_000) / 1_000);

  const hourString = hours.toString().padStart(2, "0");
  const minuteString = minutes.toString().padStart(2, "0");
  const secondString = seconds.toString().padStart(2, "0");

  return `${hourString}:${minuteString}:${secondString}`;
};

export default function DroneMap({
  children,
  viewPort,
  setViewPort,
  selectedDrone,
  setSelectedDrone,
}: PropsType) {
  const selectedDroneLong = selectedDrone?.geometry.coordinates[0];
  const selectedDroneLat = selectedDrone?.geometry.coordinates[1];
  const selectedDroneName = selectedDrone?.properties.Name;
  const selectedDroneAltitude = selectedDrone?.properties.altitude;
  const selectedDroneFlightTime = formatDuration(
    selectedDrone?.startedFlyingAt || 0,
  );

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
          <h4 className="mb-2.5 font-bold">{selectedDroneName}</h4>
          <div className="grid grid-cols-2 justify-items-center text-xs">
            <p>Altitude</p>
            <p>Flight Time</p>
            <p>{selectedDroneAltitude}</p>
            <p>{selectedDroneFlightTime}</p>
          </div>
        </Popup>
      )}
    </Map>
  );
}
