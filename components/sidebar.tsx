"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

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

export default function Sidebar() {
  const pathName = usePathname();

  return (
    <div className="flex w-32 flex-col overflow-y-auto">
      {navigationLinks.map(({ name, href, icon }, index) => {
        const isActive = pathName === href;

        return (
          <Fragment key={index}>
            <Link
              href={href}
              className={`border-primary flex h-24 flex-col items-center justify-center gap-2 border-l-4 ${isActive && "border-red-600 bg-neutral-800"}`}
            >
              <Image src={icon} alt={name} width={24} height={24} />
              <p
                className={`${isActive ? "text-header-color" : "text-inactive-status"} text-center`}
              >
                {name}
              </p>
            </Link>
            <div className="bg-inactive-status h-px w-10 self-center last:hidden" />
          </Fragment>
        );
      })}
    </div>
  );
}
