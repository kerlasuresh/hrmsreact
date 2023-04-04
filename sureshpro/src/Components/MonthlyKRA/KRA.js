import React, { useState, useEffect } from "react";
import InnerNavKRA from "./InnerNavKRA";

import Header from "../Dashboard/Header";
import Addquestionnaire from './Questionnaire/AddQuestionnaire'
export default function KRA() {
    const [value, setValue] = React.useState("1");
    const [addForm, setAddForm] = useState(false);
    const [addButton, setAddButton] = useState(true);

    // const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    //   setValue(newValue);
    // };

    // const handleAddDepartment = () => {
    //   setAddForm(true);
    //   setAddButton(false);
    // };
    document.title = "HRMS | Add Questionnaire";
    return (
        <>
            <div className='container-fluid'>
                <InnerNavKRA />
                <div className='container '>
                    <div className='col-md-12  mt-4'>
                        <Addquestionnaire />
                    </div>
                </div>
            </div>
        </>
    );
}
