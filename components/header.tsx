import Image from "next/image";
import Logo from "@/public/images/logo.svg";

export default function Header() {
  return (
    <header className="bg-color-secondary bg-secondary flex h-[72px] w-full shrink-0 items-center px-4">
      <div className="felx grow items-center justify-center">
        <Image src={Logo} alt="Logo" className="grow select-none" />
      </div>
      <div className="hidden justify-start gap-5 md:flex">
        <div className="flex items-center gap-5">
          <Image
            src={"/icons/capture-icon.svg"}
            alt="Capture Icon"
            width={24}
            height={24}
          />
          <Image
            src="/icons/language-icon.svg"
            alt="Language Icon"
            width={24}
            height={24}
          />
          <Image
            src="/icons/bell-icon.svg"
            alt="Bell Icon"
            width={24}
            height={24}
          />
        </div>
        <div className="bg-inactive-status w-px" />
        <div className="text-sm">
          <p className="text-header-color">
            Hello, <span className="font-bold">Mohammed Omar</span>
          </p>
          <p className="text-body-color">Technical Support</p>
        </div>
      </div>
    </header>
  );
}
