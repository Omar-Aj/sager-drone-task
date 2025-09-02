interface TrackedDrone extends Drone {
  pathHistory: [number, number][];
  startedFlyingAt: number;
}
