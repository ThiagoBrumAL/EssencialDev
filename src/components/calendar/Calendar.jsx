import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import { useTheme } from '../../contexts/theme/useTheme';
import { motion } from 'framer-motion';

export default function BasicDateCalendar({ value, set }) {

    const { theme } = useTheme();

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                value={value}
                onChange={set}
                minDate={dayjs()}
                maxDate={dayjs().year(2026).endOf("year")}
                className={`
                    left-[32px] 
                    top-[80px] 
                    border-[2px] 
                    rounded-xl
                    md:h-auto
                    ${!theme ? "bg-slate-900 border-slate-700" : "bg-slate-100 border-slate-200"}
                `}
                slotProps={{
                    day: (ownerState) => ({
                        sx: {
                            "&.Mui-disabled": {
                                color: "#9e9e9e !important",
                                opacity: 0.4,
                            }
                        }
                    })
                }}
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
                        color: !theme ? "#9e9e9e" : "#6b7280",
                    },

                    "& .MuiPickersCalendarHeader-switchViewButton, .MuiYearCalendar-button": {
                        color: !theme ? "#fffafe" : "#6b7280",
                    },

                    "& .MuiPickersArrowSwitcher-button": {
                        color: !theme ? "#FFFAFE" : "#6b7280", 
                    },

                    
                    "& .MuiPickersDay-root": {
                        fontSize: "1rem",
                        color: !theme ? "#FFFAFE" : "#0F172A",
                        borderRadius: "8px",
                    },

                    "& .MuiPickersDay-root.Mui-disabled": {
                        color: "#9e9e9e !important",
                        opacity: 0.4,
                    },

                    "& .MuiPickersDay-root.Mui-selected": {
                        backgroundColor: "#2563EB !important",
                        color: "white",
                    },

                    "& .MuiPickersDay-root:hover": {
                        backgroundColor: !theme ? "#1E293B" : "#E2E8F0",
                    },

                    
                    "& .MuiDayCalendar-weekDayLabel": {
                        color: "#9e9e9e",
                        opacity: 0.8,
                        fontWeight: "500",
                    },

                    "& .MuiPickersYear-yearButton.Mui-selected": {
                        backgroundColor: "transparent !important", 
                        color: "#9e9e9e !important",              
                        fontWeight: "500",
                    }
                }}
            />
        </LocalizationProvider>
        </motion.div>
    );
}