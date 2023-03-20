import { FC, useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { useAppContext } from "../../middleware/context-provider";
import { Navigate } from "react-router-dom";
import { BuildingTopBar } from "./building-topbar";
import { BuildingDrawer } from "./building-drawer";
import { getDrawerHeader } from "./mui-utils";
import { BuildingFrontMenu } from "./front-menu/building-front-menu";

export const BuildingViewer: FC = () => {
    const [sideOpen, setSideOpen] = useState(false);
    const [frontOpen, setFrontOpen] = useState(false);
    const [width] = useState(240);

    const [{ user, building }] = useAppContext();

    if (!building) {
        const url = "/map";
        return <Navigate to={url} />;
    }

    const toogleDrawer = (active: boolean) => {
        setSideOpen(active);
    };

    const toggleFrontMenu = (active: boolean) => {
        setFrontOpen(active);
        console.log("toggle");
    };

    const DrawerHeader = getDrawerHeader();

    return (
        <>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <BuildingTopBar
                    width={width}
                    open={sideOpen}
                    onOpen={() => {
                        toogleDrawer(true);
                    }}
                />
                <BuildingDrawer
                    width={width}
                    open={sideOpen}
                    onClose={() => toogleDrawer(false)}
                    onToggleMenu={() => toggleFrontMenu(true)}
                />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />

                    <BuildingFrontMenu
                        onToggleMenu={() => toggleFrontMenu(false)}
                        open={frontOpen}
                        mode="BuildingInfo"
                    />
                </Box>
            </Box>
        </>
    );
};
