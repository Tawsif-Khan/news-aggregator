import { IconLayoutDashboard, IconSearch, IconUser } from "@tabler/icons";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Menu",
  },

  {
    id: uniqueId(),
    title: "Feed",
    icon: IconLayoutDashboard,
    href: "/feed",
  },
  {
    id: uniqueId(),
    title: "Article search",
    icon: IconSearch,
    href: "/search",
  },
  {
    id: uniqueId(),
    title: "Profile",
    icon: IconUser,
    href: "/profile",
  },
];

export default Menuitems;
