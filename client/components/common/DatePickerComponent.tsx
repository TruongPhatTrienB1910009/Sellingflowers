import { Box } from '@mui/material';
import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates: any) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);

        console.log(start);
        console.log(end);
    };
    return (
        <Box>
            <DatePicker
                selected={startDate}
                onChange={onChange}
                minDate={new Date()}
                // maxDate={addMonths(new Date(), 5)}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                showDisabledMonthNavigation
            />
        </Box>
    );
};

export default DatePickerComponent