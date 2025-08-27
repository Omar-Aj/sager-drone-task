"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import largeDummyData from "./dummyData/largeDummyData";
import DroneMenu from "./components/droneMenu";
import DroneList from "./components/droneList";

export default function Page() {
  const [drones, setDrones] = useState<Drone[]>(largeDummyData as Drone[]);

  // useEffect(() => {
  //   const socket = io(process.env.NEXT_PUBLIC_HOST);

  //   socket.on("message", (data) => {
  //     setDrones((prevDrones) => [...prevDrones, data]);
  //   });

  //   return () => {
  //     socket.off("message");
  //     socket.disconnect();
  //   };
  // }, []);

  // console.log(drones);

  return (
    <div className="relative h-full bg-slate-500">
      <DroneMenu>
        <DroneList drones={drones} />
      </DroneMenu>
    </div>
  );
}
