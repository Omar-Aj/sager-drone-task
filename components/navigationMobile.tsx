"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface PropsType {
  navigationLinks: {
    name: string;
    href: string;
    icon: any;
  }[];
}

export default function NavigationMobile({ navigationLinks }: PropsType) {
  const pathName = usePathname();

  return (
    <div className="flex w-full shrink-0 justify-evenly overflow-y-auto md:hidden">
      {navigationLinks.map(({ name, href, icon }, index) => {
        const isActive = pathName === href;

        return (
          <Link
            key={index}
            href={href}
            className={`border-primary flex shrink-0 grow basis-0 flex-col items-center justify-center gap-1 border-b-4 pt-2 pb-1 ${isActive && "border-red-600 bg-neutral-800"}`}
          >
            <Image src={icon} alt={name} width={18} height={18} />
            <p
              className={`${isActive ? "text-header-color" : "text-inactive-status"} text-center text-xs md:text-base`}
            >
              {name}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
