import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import { useTheme } from '../../contexts/theme/useTheme';

export default function BasicDateCalendar({ value, set }) {

    const { theme } = useTheme();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
            value={value}
            onChange={set}
            className={`
                left-[32px] 
                top-[80px] 
                bg-slate-100 
                border-slate-200 
                border-[2px] 
                rounded-xl
                md:h-auto
                ${!theme ? "bg-slate-900 border-slate-700" : "bg-slate-100 border-slate-200"}
            `}
            minDate={dayjs()}
            maxDate={dayjs().year(2026).endOf("year")}
            sx={{
                width: "100%",
                minWidth: 0,

                "&.MuiDateCalendar-root": {
                    backgroundColor: !theme ? "#0F172A" : "#F1F5F9",
                    border: "2px solid",
                    borderColor: !theme ? "#334155" : "#E2E8F0",
                    borderRadius: "12px",
                    padding: "6px 12px",
                },

                "& .MuiPickersCalendarHeader-label": {
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    color: !theme ? "#F8FAFC" : "#0F172A",
                },

                "& .MuiPickersArrowSwitcher-button": {
                    color: !theme ? "#CBD5E1" : "#1E293B",
                },

                "& .MuiPickersDay-root": {
                    fontSize: "1rem",
                    color: !theme ? "#E2E8F0" : "#0F172A",
                    borderRadius: "8px",
                },

                "& .MuiPickersDay-root.Mui-selected": {
                    backgroundColor: "#2563EB !important",
                    color: "white",
                },

                "& .MuiPickersDay-root:hover": {
                    backgroundColor: !theme ? "#1E293B" : "#E2E8F0",
                },
                }}
        />
    </LocalizationProvider>
  );
}