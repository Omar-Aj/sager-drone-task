import DroneListItem from "./droneListItem";

interface PropsType {
  drones: TrackedDrone[];
  selectedDrone: TrackedDrone | null;
  handleSelectDrone: (drone: TrackedDrone) => void;
}

export default function DroneList({
  drones,
  selectedDrone,
  handleSelectDrone,
}: PropsType) {
  return (
    <ul className="grow overflow-auto scroll-smooth">
      {drones.map((drone, index) => (
        <DroneListItem
          key={index}
          isSelected={drone === selectedDrone}
          drone={drone}
          onClick={() => handleSelectDrone(drone)}
        />
      ))}
    </ul>
  );
}
