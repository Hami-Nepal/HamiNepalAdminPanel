import { dashboardRoutes, demoRoutes } from "routes";

export const useRouteName = () => {
    let name = "";
    dashboardRoutes.forEach((route) => {
        if (window.location.href.indexOf(route.layout + route.path) !== -1) {
            name = dashboardRoutes.rtlActive ? route.rtlName : route.name;
        }
    });
    demoRoutes.forEach((route) => {
        if (window.location.href.indexOf(route.layout + route.path) !== -1) {
            name = demoRoutes.rtlActive ? route.rtlName : route.name;
        }
    });
    return name;
};
