import { Button } from "@mui/material";
import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../middleware/context-provider";

export const LoginForm: FC = () => {
    const [state, dispatch] = useAppContext();

    const onLogin = () => {
        // console.log("Logging in");
        dispatch({ type: "LOGIN" });
    };

    if (state.user) {
        return <Navigate to="/map" />;
    }

    // return <h1>{JSON.stringify(getApp())}</h1>
    return (
        <h1>
            <Button onClick={onLogin} variant="contained">
                Login
            </Button>
        </h1>
    );
};
