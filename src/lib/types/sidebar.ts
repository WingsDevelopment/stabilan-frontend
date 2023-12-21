export interface SidebarItem {
  title: string;
  path: string;
  iconName?: string;
  activeIconName?: string;
}

export interface SidebarSection {
  subheader: string;
  items: SidebarItem[];
}
