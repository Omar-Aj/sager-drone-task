"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import "./map.css";
import { useEffect, useMemo, useState } from "react";
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
  // the key represents the registration code
  const [dronesHashmap, setDronesHashmap] = useState<Map<string, TrackedDrone>>(
    new Map(),
  );
  const [selectedDrone, setSelectedDrone] = useState<TrackedDrone | null>(null);

  const dronesArray: TrackedDrone[] = useMemo(
    () => Array.from(dronesHashmap.values()),
    [dronesHashmap],
  );

  const handleSelectDrone = (drone: TrackedDrone) => {
    setSelectedDrone(drone);
    setIsDroneListOpened(true);
    setViewPort((prevViewPort) => ({
      ...prevViewPort,
      longitude: drone.geometry.coordinates[0],
      latitude: drone.geometry.coordinates[1],
    }));
  };

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_HOST);
    socket.on("message", (data: DroneCollection) => {
      setDronesHashmap((prevDronesHashmap) => {
        const newDronesHashmap = new Map(prevDronesHashmap);

        data.features.forEach((drone) => {
          const registration = drone.properties.registration;
          const longitude = drone.geometry.coordinates[0];
          const latitude = drone.geometry.coordinates[1];

          const existingDrone = newDronesHashmap.get(registration);

          // this is the updated drone coming from backend
          // if it exists, we want to update it in the map
          // if it doesn't exist, we want to add it to the map
          const updatedDrone: TrackedDrone = {
            ...drone,
            pathHistory: [
              ...(existingDrone?.pathHistory ?? []),
              [longitude, latitude],
            ],
            startedFlyingAt: existingDrone?.startedFlyingAt ?? Date.now(),
          };

          newDronesHashmap.set(registration, updatedDrone);
        });

        return newDronesHashmap;
      });
    });

    return () => {
      socket.off("message");
      socket.disconnect();
    };
  }, []);

  // this is for updating the selectedDrone when the dronesHashmap is updated
  useEffect(() => {
    if (!selectedDrone) {
      return;
    }

    const latestSelectedDroneData = dronesHashmap.get(
      selectedDrone.properties.registration,
    );

    if (latestSelectedDroneData) {
      setSelectedDrone(latestSelectedDroneData);
    }
  }, [dronesHashmap]);

  return (
    <div className="relative h-full bg-slate-500">
      {/* This is the side menu that shows all drones as list */}
      <DroneMenu
        isDroneListOpened={isDroneListOpened}
        setIsDroneListOpened={setIsDroneListOpened}
      >
        <DroneList
          drones={dronesArray}
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
        {dronesArray.map((drone, index) => {
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
            dronesArray.filter((drone) => {
              const regestration = drone.properties.registration.split("-")[1];
              return !regestration.startsWith("B");
            }).length
          }
        </span>
        <p>Drone Flying</p>
      </div>
    </div>
  );
}
