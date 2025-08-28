interface PropsType {
  drone: Drone;
}

export default function DroneListItem({ drone }: PropsType) {
  return (
    <li className="border-t-secondary border-t px-4 pt-3 pb-2 md:px-6 md:pt-5 md:pb-4">
      <h3 className="text-header-color mb-2 text-sm font-bold md:mb-4 md:text-base">
        {drone.features[0].properties.Name}
      </h3>
      <div className="flex">
        <div className="grid grow grid-cols-2 gap-1 md:gap-4">
          <div>
            <h4 className="text-[10px] md:text-[11px]">Serial #</h4>
            <p className="text-[10px] font-bold md:text-[11px]">
              {drone.features[0].properties.serial}
            </p>
          </div>
          <div>
            <h4 className="text-[10px] md:text-[11px]">Registration #</h4>
            <p className="text-[10px] font-bold md:text-[11px]">
              {drone.features[0].properties.registration}
            </p>
          </div>
          <div>
            <h4 className="text-[10px] md:text-[11px]">Pilot</h4>
            <p className="text-[10px] font-bold md:text-[11px]">
              {drone.features[0].properties.pilot}
            </p>
          </div>
          <div>
            <h4 className="text-[10px] md:text-[11px]">Organization</h4>
            <p className="text-[10px] font-bold md:text-[11px]">
              {drone.features[0].properties.organization}
            </p>
          </div>
        </div>
        <div className="mt-2 h-6 w-6 rounded-full border border-white bg-lime-500 md:mt-6"></div>
      </div>
    </li>
  );
}
