import React from "react";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <Link href={"/"}>
        <Image
          src={"/assets/icons/logo-full-brand.svg"}
          alt={"logo"}
          width={160}
          height={50}
          className={"hidden h-auto lg:block"}
        />
        <Image
          src={"/assets/icons/logo-brand.svg"}
          alt={"for mobile logo"}
          width={52}
          height={52}
          className={"lg:hidden"}
        />
      </Link>
    </aside>
  );
};
export default Sidebar;
