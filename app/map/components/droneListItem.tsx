interface PropsType {
  drone: TrackedDrone;
  isSelected: boolean;
  onClick: () => void;
}

export default function DroneListItem({
  drone,
  isSelected,
  onClick,
}: PropsType) {
  const name = drone.properties.Name;
  const serial = drone.properties.serial;
  const registration = drone.properties.registration;
  const pilot = drone.properties.pilot;
  const organization = drone.properties.organization;

  const canFly = drone.properties.registration.split("-")[1].startsWith("B");

  return (
    <li
      id={serial}
      onClick={onClick}
      className={`border-t-secondary cursor-pointer border-t px-4 pt-3 pb-2 md:px-6 md:pt-5 md:pb-4 ${isSelected && "bg-neutral-800"}`}
    >
      <h3 className="text-header-color mb-2 text-sm font-bold md:mb-4 md:text-base">
        {name}
      </h3>
      <div className="flex">
        <div className="grid grow grid-cols-2 gap-1 md:gap-4">
          <div>
            <h4 className="text-[10px] md:text-[11px]">Serial #</h4>
            <p className="text-[10px] font-bold md:text-[11px]">{serial}</p>
          </div>
          <div>
            <h4 className="text-[10px] md:text-[11px]">Registration #</h4>
            <p className="text-[10px] font-bold md:text-[11px]">
              {registration}
            </p>
          </div>
          <div>
            <h4 className="text-[10px] md:text-[11px]">Pilot</h4>
            <p className="text-[10px] font-bold md:text-[11px]">{pilot}</p>
          </div>
          <div>
            <h4 className="text-[10px] md:text-[11px]">Organization</h4>
            <p className="text-[10px] font-bold md:text-[11px]">
              {organization}
            </p>
          </div>
        </div>
        <div
          className={`mt-2 h-6 w-6 rounded-full border border-white md:mt-6 ${canFly ? "bg-lime-500" : "bg-red-600"}`}
        />
      </div>
    </li>
  );
}
