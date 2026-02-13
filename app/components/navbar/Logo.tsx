import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="">
      <Image src="/images/logo.png" alt="the logo" width={100} height={100} />
    </Link>
  );
};

export default Logo;
