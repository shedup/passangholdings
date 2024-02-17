import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <header className="background-minnesota">
      <h1>Passang Holdings</h1>
      <h2>Based in Minnesota</h2>
      <h3>Land of 10,000 Lakes</h3>
      <div>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link href="publications">Publication</Link>
            </li>
            <li>
              <Link href="about">About</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
