
import Menu from "../Navigate/Navigate";

export default function Header() {
  return (
    <div className="flex h-content p-4 fixed top-0 w-full bg-slate-800 z-10">
      <Menu />
    </div>
  );
}