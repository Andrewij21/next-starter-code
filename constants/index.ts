export const NAV_LINKS = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "dashboard",
          url: "/dashboard",
          roles: ["user"],
        },
        {
          title: "Users",
          url: "/users",
          roles: ["user"],
        },
        {
          title: "Todo",
          url: "/todo",
          roles: ["user", "admin"],
        },
      ],
    },
    {
      title: "admin",
      url: "/admin",
      roles: ["user", "admin"],
      items: [],
    },
  ],
};
