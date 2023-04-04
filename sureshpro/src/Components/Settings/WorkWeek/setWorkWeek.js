import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const WorkWeekTable = ({ Workweekone, changeWeek }) => {


    return (
        <td onClick={() => changeWeek(Workweekone + 1)} >
            {Workweekone == 1 ? <span className="green"></span> : Workweekone == 2 ? <span className="red"></span> : <span className="yellow"></span>}

        </td>


    )
}

export default WorkWeekTable;