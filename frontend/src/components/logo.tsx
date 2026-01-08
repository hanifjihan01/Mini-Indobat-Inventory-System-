import darkLogo from "@/assets/logos/logo_ori.png";
import logo from "@/assets/logos/logo_ori.png";
import Image from "next/image";

export function Logo() {
  return (
    <>
      <Image
        src={logo}
        width={200}
        height={200}
        className="dark:hidden object-contain"
        alt="Indobat logo"
        quality={100}
      />

      <Image
        src={darkLogo}
        width={200}
        height={200}
        className="hidden dark:block object-contain"
        alt="Indobat logo"
        quality={100}
      />
    </>
  );
}

