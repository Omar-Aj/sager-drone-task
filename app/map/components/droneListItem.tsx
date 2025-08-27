import React from "react";

interface PropsType {
  drone: Drone;
}

export default function DroneListItem({ drone }: PropsType) {
  return (
    <li className="border-t-secondary border-t px-6 pt-5 pb-4">
      <h3 className="text-header-color mb-4 font-bold">
        {drone.features[0].properties.Name}
      </h3>
      <div className="flex">
        <div className="grid grow grid-cols-2 gap-4">
          <div>
            <h4 className="text-[11px]">Serial #</h4>
            <p className="text-[11px] font-bold">
              {drone.features[0].properties.serial}
            </p>
          </div>
          <div>
            <h4 className="text-[11px]">Registration #</h4>
            <p className="text-[11px] font-bold">
              {drone.features[0].properties.registration}
            </p>
          </div>
          <div>
            <h4 className="text-[11px]">Pilot</h4>
            <p className="text-[11px] font-bold">
              {drone.features[0].properties.pilot}
            </p>
          </div>
          <div>
            <h4 className="text-[11px]">Organization</h4>
            <p className="text-[11px] font-bold">
              {drone.features[0].properties.organization}
            </p>
          </div>
        </div>
        <div className="mt-6 h-6 w-6 rounded-full border border-white bg-lime-500"></div>
      </div>
    </li>
  );
}
