import { ReactNode } from 'react';
import { Home, Info, Mail } from 'lucide-react';

interface SidebarItemProps {
  icon?: ReactNode;
  label: string;
  href: string;
}

const SidebarItem = ({ icon, label, href }: SidebarItemProps) => {
  return (
    <li className="mb-2">
      <a href={href} className="text-white hover:underline flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </a>
    </li>
  );
};

const Sidebar = () => {
  return (
    <aside className="w-64 p-4 shadow-md h-full bg-gray-800 text-white border-r-4 border-white">
      <h2 className="text-3xl mb-4">Logo</h2>
      <ul className="list-none p-0">
        <SidebarItem href="/" label="Home" icon={<Home size={20} />} />
        <SidebarItem href="/about" label="About" icon={<Info size={20} />} />
        <SidebarItem href="/contact" label="Contact" icon={<Mail size={20} />} />
      </ul>
    </aside>
  );
};

export default Sidebar;
