import {
  DroneArrowGreenIcon,
  DroneArrowRedIcon,
  DroneIcon,
} from "@/public/icons";
import Image from "next/image";
import Link from "next/link";
import { Marker } from "react-map-gl/mapbox";

interface PropsType {
  drone: Drone;
  handleSelectDrone: (drone: Drone) => void;
}

export default function DroneMapItem({ drone, handleSelectDrone }: PropsType) {
  const serial = drone.features[0].properties.serial;
  const longitude = drone.features[0].geometry.coordinates[0];
  const latitude = drone.features[0].geometry.coordinates[1];
  const yaw = drone.features[0].properties.yaw;

  const canFly = drone.features[0].properties.registration
    .split("-")[1]
    .startsWith("B");

  return (
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
          />
        </div>
      </Link>
    </Marker>
  );
}
