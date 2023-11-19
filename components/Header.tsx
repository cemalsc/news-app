import Link from "next/link";
import DarkModeButton from "./DarkModeButton";
import NavLinks from "./NavLinks";
import SearchBox from "./SearchBox";

function Header() {
  return (
    <header>
      <div className="grid grid-cols-3 p-10">
        <div />
        <div className="flex justify-center">
          <Link href="/" prefetch={false}>
            <h1 className="font-serif text-4xl text-center underline decoration-blue-600 content-end">
              The News
            </h1>
          </Link>
        </div>
        <div className="flex justify-end">
          <DarkModeButton />
        </div>
      </div>
      <NavLinks />
      <SearchBox />
    </header>
  );
}

export default Header;