import { FC } from "react";
import { Button } from "@mui/material";
import { useAppContext } from "../../middleware/context-provider";
import { Navigate } from "react-router-dom";

export const BuildingViewer: FC = () => {

    const [state, dispatch] = useAppContext()
    const {building} = state

    const onCloseBuilding = () => {
        dispatch({type: "CLOSE_BUILDING"})
    }


    if(!building){
        const url = "/map"
        return <Navigate to={url}/>
    }

    return (
    <>
        <h1>Hello building viewer!</h1>
        <Button onClick={onCloseBuilding}>CLose Building</Button>
    </>

    )
}