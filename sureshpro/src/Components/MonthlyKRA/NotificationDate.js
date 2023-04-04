import React, { useState, useEffect } from "react";
import InnerNavKRA from "./InnerNavKRA";

import Header from "../Dashboard/Header";
import NotificationDate from "../../../src/Components/MonthlyKRA/NotificationDate/NotificationDate";
export default function KRANotification() {
    const [value, setValue] = React.useState("1");
    const [addForm, setAddForm] = useState(false);
    const [addButton, setAddButton] = useState(true);
    document.title = "HRMS | Notification Date";
    return (
        <>
            <div className='container-fluid'>
                <InnerNavKRA />
                <div className='container '>
                    <div className='col-md-12  mt-4'>
                        <NotificationDate />
                    </div>
                </div>
            </div>

        </>
    );
}
