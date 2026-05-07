import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const components: { title: string; href: string }[] = [
  {
    title: "All Categories",
    href: "/categories",
  },
  {
    title: "Electronics",
    href: "/categories/6439d2d167d9aa4ca970649f",
  },
  {
    title: "Woemen Fashion",
    href: "/categories/6439d58a0049ad0b52b9003f",
  },
  {
    title: "mens Fashion",
    href: "/categories/6439d5b90049ad0b52b90048",
  },
];
export default function Navmenu() {
  return (
    <NavigationMenu className="z-50">
      <NavigationMenuItem className="hidden md:flex">
        <NavigationMenuTrigger className=" hover:text-sprinGreen">
          Categories
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-50 gap-2  z-50 grid-cols-1 ">
            {components.map((component) => (
              <ListItem
                key={component.title}
                title={component.title}
                href={component.href}
                className="z-50"
              ></ListItem>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}
function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
