"use client";

import Image from "next/image";
import { OptionProps } from '@/types/components';

export default function Option({ icon, title }: OptionProps) {
	return (
      (<div className="px-6 py-3 flex gap-4 rounded-[23px] border-t-[0.35px] border-gray-400 bg-navy-500 shadow-[0_17px_12px_-9px_rgba(11,10,10,0.25)]">
        <div className='flex items-center gap-3 w-max'>
          <Image
            src={icon}
            alt="Icon"
            width={28}
            height={28}
            style={{ height: "auto" }}
          />
          <p className="font-maven-pro font-bold">{title}</p>
        </div>
      </div>)
    );
}