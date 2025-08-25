import { Button } from "../ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { useLogout } from "@/queries/auth";
import { Fragment } from "react";
interface AppHeaderProps {
  breadcrumbs: { href?: string; label: string }[];
}
export default function AppHeader({ breadcrumbs }: AppHeaderProps) {
  const { mutate } = useLogout();
  const logoutHandler = () => {
    mutate();
  };
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b justify-between px-3">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => {
              const isLastItem = index === breadcrumbs.length - 1;
              return (
                <Fragment key={index}>
                  <BreadcrumbItem>
                    {isLastItem ? (
                      // The last item is a non-clickable page label
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                      // Other items are clickable links
                      <BreadcrumbLink href={item.href}>
                        {item.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLastItem && <BreadcrumbSeparator />}
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="">
        <Button className="self-end ml-auto w-fit" onClick={logoutHandler}>
          SIGNOUT
        </Button>
      </div>
    </header>
  );
}
