interface Drone {
  type: string;
  features: [
    {
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
    },
  ];
}
