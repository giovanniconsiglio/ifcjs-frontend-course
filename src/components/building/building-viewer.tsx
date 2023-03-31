import { FC, useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { useAppContext } from "../../middleware/context-provider";
import { Navigate } from "react-router-dom";
import { BuildingTopBar } from "./building-topbar";
import { BuildingDrawer } from "./building-drawer";
import { getDrawerHeader } from "./mui-utils";
import { BuildingFrontMenu } from "./front-menu/building-front-menu";
import { FrontMenuMode } from "./types";

export const BuildingViewer: FC = () => {
    const [width] = useState(240);
    const [sideOpen, setSideOpen] = useState(false);
    const [frontOpen, setFrontOpen] = useState(false);
    const [frontMenuMode, setFrontMenuMode] = useState<FrontMenuMode>("BuildingInfo");

    const [{ user, building }] = useAppContext();

    if(!user) {
        return <Navigate to={"/login"} />
    }
    
    if (!building) {
        const url = "/map";
        return <Navigate to={url} />;
    }

    const toogleDrawer = (active: boolean) => {
        setSideOpen(active);
    };

    const toggleFrontMenu = (active: boolean, mode?: FrontMenuMode) => {
        if(mode) {
            setFrontMenuMode(mode)
        }
        setFrontOpen(active);
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
                    onToggleMenu={toggleFrontMenu}
                />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />

                    <BuildingFrontMenu
                        onToggleMenu={() => toggleFrontMenu(false)}
                        open={frontOpen}
                        mode={frontMenuMode}
                    />
                </Box>
            </Box>
        </>
    );
};
