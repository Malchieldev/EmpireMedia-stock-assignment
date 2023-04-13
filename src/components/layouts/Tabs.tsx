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
            <li
              key={`tab-${i}`}
              className={tab.path === path ? `${styled.active}` : ""}
            >
              <Link href={tab.path}>{tab.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
