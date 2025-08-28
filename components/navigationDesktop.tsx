"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

interface PropsType {
  navigationLinks: {
    name: string;
    href: string;
    icon: any;
  }[];
}

export default function NavigationDesktop({ navigationLinks }: PropsType) {
  const pathName = usePathname();

  return (
    <div className="hidden w-32 shrink-0 flex-col overflow-y-auto md:flex">
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
