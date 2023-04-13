import { useRouter } from "next/router";

import navLinks from "@/utils/navigation";

import Link from "next/link";

import styled from "@/styles/Tabs.module.css";

export default function Tabs() {
  const router = useRouter();
  const path = router.asPath;

  return (
    <nav>
      <ul className={styled.tab}>
        {navLinks.map((tab, i) => {
          return (
            <Link key={`tab-${i}`} href={tab.path}>
              <li className={tab.path === path ? `${styled.active}` : ""}>
                {tab.name}
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
