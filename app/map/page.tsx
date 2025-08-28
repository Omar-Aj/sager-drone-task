"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import "./map.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import DroneMenu from "./components/droneMenu";
import DroneList from "./components/droneList";
import DroneMap from "./components/droneMap";
import DroneMapItem from "./components/droneMapItem";

export default function Page() {
  const [viewPort, setViewPort] = useState({
    longitude: 35.91057447514749,
    latitude: 31.954379225757464,
    zoom: 12,
  });
  const [isDroneListOpened, setIsDroneListOpened] = useState<boolean>(true);
  const [drones, setDrones] = useState<Drone[]>([]);
  const [selectedDrone, setSelectedDrone] = useState<Drone | null>(null);

  const handleSelectDrone = (drone: Drone) => {
    setSelectedDrone(drone);
    setIsDroneListOpened(true);
    setViewPort((prevViewPort) => ({
      ...prevViewPort,
      longitude: drone.features[0].geometry.coordinates[0],
      latitude: drone.features[0].geometry.coordinates[1],
    }));
  };

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_HOST);
    socket.on("message", (data) => {
      setDrones((prevDrones) => {
        return [...prevDrones, data];
      });
    });
    return () => {
      socket.off("message");
      socket.disconnect();
    };
  }, []);

  return (
    <div className="relative h-full bg-slate-500">
      {/* This is the side menu that shows all drones as list */}
      <DroneMenu
        isDroneListOpened={isDroneListOpened}
        setIsDroneListOpened={setIsDroneListOpened}
      >
        <DroneList
          drones={drones}
          selectedDrone={selectedDrone}
          handleSelectDrone={handleSelectDrone}
        />
      </DroneMenu>
      {/* This is the map that shows the drones inside the map */}
      <DroneMap
        viewPort={viewPort}
        setViewPort={setViewPort}
        selectedDrone={selectedDrone}
        setSelectedDrone={setSelectedDrone}
      >
        {drones.map((drone, index) => {
          return (
            <DroneMapItem
              key={index}
              drone={drone}
              handleSelectDrone={handleSelectDrone}
            />
          );
        })}
      </DroneMap>
      {/* Number of drones flying (temporarly red drones) */}
      <div className="text-primary absolute top-2.5 right-2.5 z-10 flex items-center justify-start gap-1.5 rounded-[10px] bg-neutral-300 px-3 py-1.5 text-sm md:top-auto md:right-8 md:bottom-7">
        <span className="bg-primary text-header-color flex h-7 w-7 items-center justify-center rounded-full font-bold">
          {
            drones.filter((drone) => {
              const regestration =
                drone.features[0].properties.registration.split("-")[1];
              return !regestration.startsWith("B");
            }).length
          }
        </span>
        <p>Drone Flying</p>
      </div>
    </div>
  );
}
