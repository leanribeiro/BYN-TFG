import { User } from "../../types";
import { RoutesLinksProps } from "../../types/RoutesLinks";

export interface SideBarProps {
        user: User | null,
        menuItems: RoutesLinksProps[],
        logout: () => void,
}
    