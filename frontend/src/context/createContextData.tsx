import { createContext, useReducer, FC } from "react";

type Reducer = (state: any, actions: any) => {};
type Actions = { [key: string]: (dispatch: any) => (props?: any) => void };

const createContextData = <T extends {}>(
  reducer: Reducer,
  initialState: any,
  actions: Actions
) => {
  const Context = createContext<T>({ ...initialState, ...actions });

  const Provider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    let bundleActions: any = {};
    for (let key in actions) {
      bundleActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ ...bundleActions, ...state }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};

export default createContextData;
