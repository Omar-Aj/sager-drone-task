import Image from "next/image";
import Logo from "@/public/images/logo.svg";
import Link from "next/link";
import { BellIcon, CaptureIcon, LanguageIcon } from "@/public/icons";

export default function Header() {
  return (
    <header className="bg-color-secondary bg-secondary flex h-[40px] w-full shrink-0 items-center gap-2 px-4 md:h-[72px]">
      <Link href={"/"} className="shrink-0">
        <Image
          src={Logo}
          alt="Logo"
          height={20}
          priority
          className="pointer-events-none select-none md:hidden"
        />
        <Image
          src={Logo}
          alt="Logo"
          priority
          className="pointer-events-none hidden select-none md:block"
        />
      </Link>
      <div className="hidden grow justify-end gap-5 md:flex">
        <div className="flex items-center gap-5">
          <Image
            src={CaptureIcon}
            alt="Capture Icon"
            width={24}
            height={24}
            className="pointer-events-none select-none"
          />
          <Image
            src={LanguageIcon}
            alt="Language Icon"
            width={24}
            height={24}
            className="pointer-events-none select-none"
          />
          <Image
            src={BellIcon}
            alt="Bell Icon"
            width={24}
            height={24}
            className="pointer-events-none select-none"
          />
        </div>
        <div className="bg-inactive-status w-px" />
        <div className="text-sm">
          <p
            title="Mohammad Omar"
            className="text-header-color max-w-48 truncate"
          >
            Hello, <span className="font-bold">Mohammad Omar</span>
          </p>
          <p
            title="Technical Support"
            className="text-inactive-status max-w-48 truncate"
          >
            Technical Support
          </p>
        </div>
      </div>
    </header>
  );
}
