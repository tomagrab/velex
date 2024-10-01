import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <Image
          src="https://picsum.photos/200"
          alt="velex Logo"
          width={200}
          height={200}
        />
      </div>
      <div className="sidebar__menu">
        <ul>
          <li>
            <Link href="#">Placeholder 1</Link>
          </li>
          <li>
            <Link href="#">Placeholder 2</Link>
          </li>
          <li>
            <Link href="#">Placeholder 3</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
