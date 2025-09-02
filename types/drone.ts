interface Drone {
  type: string;
  properties: {
    serial: string;
    registration: string;
    Name: string;
    altitude: number;
    pilot: string;
    organization: string;
    yaw: number;
  };
  geometry: {
    coordinates: [number, number];
    type: string;
  };
}
