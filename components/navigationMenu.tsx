import NavigationMobile from "./navigationMobile";
import NavigationDesktop from "./navigationDesktop";

import { DashboardIcon, LocationIcon } from "@/public/icons";

const navigationLinks = [
  {
    name: "Dashboard",
    href: "/",
    icon: DashboardIcon,
  },
  {
    name: "Map",
    href: "/map",
    icon: LocationIcon,
  },
];

export default function NavigationMenu() {
  return (
    <>
      <NavigationMobile navigationLinks={navigationLinks} />
      <NavigationDesktop navigationLinks={navigationLinks} />
    </>
  );
}
