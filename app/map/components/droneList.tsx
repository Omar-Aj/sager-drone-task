import DroneListItem from "./droneListItem";

interface PropsType {
  drones: Drone[];
}

export default function DroneList({ drones }: PropsType) {
  return (
    <ul className="grow overflow-auto">
      {drones.map((drone, index) => (
        <DroneListItem key={index} drone={drone} />
      ))}
    </ul>
  );
}
