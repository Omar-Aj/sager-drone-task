"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationLinks = [
  {
    name: "Dashboard",
    href: "/",
    icon: "/icons/dashboard-icon.svg",
  },
  {
    name: "Map",
    href: "/map",
    icon: "/icons/map-icon.svg",
  },
];

export default function Sidebar() {
  const pathName = usePathname();
  console.log(pathName);

  return (
    <div className="flex w-32 flex-col overflow-y-auto">
      {navigationLinks.map(({ name, href, icon }, index) => (
        <div key={index}>
          <Link
            href={href}
            className={`border-primary flex h-24 flex-col items-center justify-center gap-2 border-l-4 ${pathName === href && "border-red-600 bg-neutral-800"}`}
          >
            <Image src={icon} alt="Dashboard" width={24} height={24} />
            <p className="text-header-color text-center">{name}</p>
          </Link>
          <div className="bg-inactive-status h-px w-10 self-center last:hidden" />
        </div>
      ))}
    </div>
  );
}
