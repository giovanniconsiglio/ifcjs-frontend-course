import { FC, useEffect, useRef, useState } from "react";
import { useAppContext } from "../../middleware/context-provider";
import { Navigate } from "react-router-dom";
import { Button } from "@mui/material";
import "./map-viewer.css";
export const MapViewer: FC = () => {
    const conteinerRef = useRef(null);
    const [isCreating, setIsCreating] = useState(false);

    const [state, dispatch] = useAppContext();
    const { user, building } = state;

    const onToogleCreate = () => {
        setIsCreating(!isCreating);
    };

    const onCreate = () => {
        if (isCreating) {
            dispatch({ type: "ADD_BUILDING", payload: user });
            setIsCreating(false);
        }
    };

    useEffect(() => {
        const container = conteinerRef.current;
        if (container && user) {
            dispatch({ type: "START_MAP", payload: { container, user } });
        }

        return () => {
            dispatch({ type: "REMOVE_MAP" });
        };
    }, []);

    if (!user) {
        return <Navigate to="/login" />;
    }

    if(building){
        const url = "/building?id=" + building.uid
        console.log(building)
        console.log(url)
        return <Navigate to={url}/>
    }

    const onLogout = () => {
        dispatch({ type: "LOGOUT" });
    };

    return (
        <>
            <div
                onContextMenu={onCreate}
                className="full-screen"
                ref={conteinerRef}
            />
            {isCreating && (
                <div className="overLay">
                    <p>Right click to create a new Building or </p>
                    <Button onClick={onToogleCreate}>cancel</Button>
                </div>
            )}
            <div className="gis-button-container">
                <Button variant="contained" onClick={onToogleCreate}>Create Building</Button>
            <Button variant="contained" onClick={onLogout}>Log out</Button>
            </div>
            
        </>
    );
};
