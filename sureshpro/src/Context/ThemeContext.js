import React, { createContext, useState, useEffect, useReducer } from 'react';
import AppReducer from './AppReducer'
import axios from "axios";
const initialState = {
    employees: [
        { id: 1, name: 'Ishan Manandhar', location: 'Kathmandu', designation: 'Frontend Dev' }
    ]
}

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
    const [attendanceList, dispatch] = useReducer(AppReducer, initialState);
    // function getAttendanceList2() {
    //     dispatch({
    //         type: 'GET_ATTANDANCE',
    //         payload: null
    //     })
    // }

    return (<GlobalContext.Provider value={{
        employees: attendanceList.employees,
    }}>
        {children}
    </GlobalContext.Provider>);
}