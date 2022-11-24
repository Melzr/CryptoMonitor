import axios from "axios";
import { baseURL } from "../../config";
import { Variable } from "../../interfaces/interfaces";
import { logout } from "./authAction";
import { AppDispatch, RootState } from "..";

export type VariableAction = {
    type: "SELECT_VARIABLE";
    variable: Variable;
} |
{
  type: "FETCH_VARIABLES";
  variables: Variable[];
}

export const setSelectedVariable = (variable: Variable): VariableAction => ({
    type: "SELECT_VARIABLE",
    variable,
  });

export const fetchVariables = (variables: Variable[]): VariableAction => ({
    type: "FETCH_VARIABLES",
    variables
  })

export const getVariables = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().auth.token;
    try {
        const requestURL: string = `${baseURL}/api/variable`;
        const result = await axios.get(requestURL, { headers: { Authorization: `Bearer ${token}` }});
        dispatch(fetchVariables(result.data.variables));
    } catch (e) {
        if (axios.isAxiosError(e)) {
            if (e.response?.status === 401) {
                dispatch(logout());
            } else {
                throw e.response?.data.error;
            }
        }
    }
};

export const deleteVariable = (name: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().auth.token;
    try {
        const requestURL: string = `${baseURL}/api/variable/${name}`;
        const result = await axios.delete(requestURL, { headers: { Authorization: `Bearer ${token}` }});
        dispatch(getVariables());
    } catch (e) {
        if (axios.isAxiosError(e)) {
            if (e.response?.status === 401) {
                dispatch(logout());
            } else {
                throw e.response?.data.error;
            }
        }
    }
};

export const saveVariable = (name: string, value: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().auth.token;
    let parsed: number | string | boolean;
    if (value == "true" || value == "false") {
        parsed = (value === "true");
    } else if (!isNaN(parseFloat(value))) {
        parsed = parseFloat(value);
    } else {
        parsed = value;
    }
    const requestVariable = { "name": name, "value" : parsed };
    try {
      const requestURL: string = `${baseURL}/api/variable`;
      const result = await axios.post(requestURL, requestVariable, { headers: { Authorization: `Bearer ${token}` }});
      dispatch(getVariables());
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          dispatch(logout());
        } else {
          throw e.response?.data.error;
        }
      }
    }
  };