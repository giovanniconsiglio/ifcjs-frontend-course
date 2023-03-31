import {
    FC,
    PropsWithChildren,
    useReducer,
    createContext,
    useContext,
} from "react";
import { executeCore } from "./core-handler";
import { initialState, State } from "./state";
import { reducer } from "./state-handler";
import { Action, ActionList } from "./actions";
import { Authenticator } from "./authenticator";
import { Events } from "./event-handler";

const appContext = createContext<[State, React.Dispatch<Action>]>([
    initialState,
    () => {},
]);

export const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, setState] = useReducer(reducer, initialState);

    const dispatch = (value: Action) => {
        setState(value); //Update react state
        executeCore(value, events); //Update core
    };

    const events = new Events();
    for (const type of ActionList) {
        events.on(type, (payload: any) => {
            dispatch({ type, payload }); // Update react&core
        });
    }

    return (
        <appContext.Provider value={[state, dispatch]}>
            <Authenticator />
            {children}
        </appContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(appContext);
};
