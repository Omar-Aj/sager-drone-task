import {
  DroneArrowGreenIcon,
  DroneArrowRedIcon,
  DroneIcon,
} from "@/public/icons";
import Image from "next/image";
import Link from "next/link";
import {
  GeoJSONSourceSpecification,
  Layer,
  Marker,
  Source,
} from "react-map-gl/mapbox";

interface PropsType {
  drone: TrackedDrone;
  handleSelectDrone: (drone: TrackedDrone) => void;
}

export default function DroneMapItem({ drone, handleSelectDrone }: PropsType) {
  const serial = drone.properties.serial;
  const longitude = drone.geometry.coordinates[0];
  const latitude = drone.geometry.coordinates[1];
  const yaw = drone.properties.yaw;

  const canFly = drone.properties.registration.split("-")[1].startsWith("B");

  const lineGeoJSON: GeoJSONSourceSpecification = {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: { type: "LineString", coordinates: drone.pathHistory },
      properties: {},
    },
  };

  return (
    <>
      <Marker
        longitude={longitude}
        latitude={latitude}
        onClick={() => handleSelectDrone(drone)}
      >
        <Link
          href={`#${serial}`}
          className={`relative flex h-12 w-12 items-center justify-center rounded-full ${canFly ? "bg-lime-500" : "bg-red-600"}`}
        >
          <Image src={DroneIcon} alt="Drone Icon" width={24} height={24} />
          <div
            className="top absolute flex h-[calc(100%+32px)] items-start justify-start"
            style={{
              transform: `rotate(${yaw}deg)`,
            }}
          >
            <Image
              src={canFly ? DroneArrowGreenIcon : DroneArrowRedIcon}
              alt="Drone Arrow Icon"
              height={16}
            />
          </div>
        </Link>
      </Marker>
      <Source type="geojson" data={lineGeoJSON.data}>
        <Layer
          type="line"
          paint={{
            "line-color": canFly ? "#84cc16" : "#dc2626",
            "line-width": 3,
          }}
        />
      </Source>
    </>
  );
}
