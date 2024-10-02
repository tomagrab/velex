import Image from 'next/image';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="sidebar flex w-16 flex-col">
      <div className="sidebar__logo h-16">
        <Image
          className="object-"
          src="https://picsum.photos/64"
          alt="velex Logo"
          width={64}
          height={64}
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
