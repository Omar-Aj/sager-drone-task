import { ArrowRightIcon, CancelIcon } from "@/public/icons";
import Image from "next/image";
import { PropsWithChildren, useState } from "react";

type PropsType = PropsWithChildren;

export default function DroneMenu({ children }: PropsType) {
  const [isDroneListOpen, setIsDroneListOpen] = useState<boolean>(true);
  const [droneListTabIndex, setDroneListTabIndex] = useState<number>(0);

  return (
    <>
      <div
        className={`bg-primary absolute bottom-2.5 left-2.5 flex h-80 w-[calc(100%-20px)] flex-col pt-4 md:top-2.5 md:h-[calc(100%-20px)] md:w-[330px] md:pt-8 ${!isDroneListOpen && "hidden"}`}
      >
        <div className="mb-3 flex shrink-0 justify-between px-4 md:mb-9 md:px-5">
          <h1 className="text-header-color font-bold uppercase md:text-xl">
            Drone Flying
          </h1>
          <button
            title="Close Drone List"
            onClick={() => setIsDroneListOpen(false)}
          >
            <Image src={CancelIcon} alt="Close" />
          </button>
        </div>
        <div className="flex shrink-0 gap-8 px-4 md:px-5">
          <button
            onClick={() => setDroneListTabIndex(0)}
            className={`cursor-pointer border-b-[6px] pb-1 text-xs md:pb-2.5 md:text-base ${droneListTabIndex === 0 ? "text-header-color border-red-600" : "text-inactive-status border-transparent"}`}
          >
            Drones
          </button>
          <button
            onClick={() => setDroneListTabIndex(1)}
            className={`cursor-pointer border-b-[6px] pb-1 text-xs md:pb-2.5 md:text-base ${droneListTabIndex === 1 ? "text-header-color border-red-600" : "text-inactive-status border-transparent"}`}
          >
            Flights History
          </button>
        </div>
        {children}
      </div>

      <button
        className={`border-body-color bg-primary absolute top-2.5 left-2.5 m-auto h-10 w-10 rounded-full ${isDroneListOpen ? "hidden" : "flex items-center justify-center"}`}
        title="Open Drone List"
        onClick={() => setIsDroneListOpen(true)}
      >
        <Image src={ArrowRightIcon} alt="Arrow Right" width={24} height={24} />
      </button>
    </>
  );
}
