import { Button, TextField, Box } from "@mui/material";
import { FC } from "react";
import { useAppContext } from "../../../../middleware/context-provider";
import "./front-menu-content.css"

export const BuildingInfoMenu: FC<{
    onToggleMenu: () => void;
}> = ({ onToggleMenu }) => {
    const [state, dispatch] = useAppContext();

    const { building } = state;
    if (!building) {
        throw new Error("No building Active!");
    }

    const onUpdateBuilding = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const newBuilding = { ...building } as any;
        newBuilding.name = data.get("building-name") || building.name;
        dispatch({ type: "UPDATE_BUILDING", payload: newBuilding });
        onToggleMenu();
    };

    return (
        <Box component="form" onSubmit={onUpdateBuilding}>
            <div className="list-item">
                <TextField
                    fullWidth
                    id="building-id"
                    label="Building Id"
                    name="building-id"
                    autoComplete="building-id"
                    defaultValue={building.uid}
                    disabled={true}
                />
            </div>
            <div className="list-item">
                <TextField
                    fullWidth
                    id="building-name"
                    label="Building Name"
                    name="building-name"
                    autoComplete="building-name"
                    defaultValue={building.name}
                />
            </div>
            <div className="list-item">
                <Button type="submit" className="submit-button">
                    Update building
                </Button>
            </div>
        </Box>
    );
};
