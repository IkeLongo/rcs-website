
import Image from "next/image";

export default function LogoNavbar() {
	return (
		<nav style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: "1rem 0" }}>
      <Image
        src="/logo-rivercity-creatives-horizontal-green-blue.png" // Update this path if your logo is elsewhere
        alt="River City Studios Logo"
        width={150}
        height={75}
        priority
      />
		</nav>
	);
}
