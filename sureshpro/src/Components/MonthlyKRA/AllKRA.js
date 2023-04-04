import React, { useState, useEffect } from "react";
import InnerNavKRA from "./InnerNavKRA";

import Header from "../Dashboard/Header";
import All_KRA_List from "./All_KRA_list/All_KRA_List";
export default function ALLKRA() {
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
    document.title = "HRMS | All KRA Form List";
    return (
        <>
            <div className='container-fluid'>
                <InnerNavKRA />
                <div className='container '>
                    <div className='col-md-12  mt-4'>
                        <All_KRA_List />
                    </div>
                </div>
            </div>
        </>
    )
}
