import { useAppointment } from "../contexts/appointment/useAppointment";

function Appointments () {

    const { nameAppt } = useAppointment();

    return (
        <div 
        className="
            w-full
            min-h-[75.1dvh]
        ">
            { nameAppt && nameAppt }
        </div>
    )
}

export default Appointments;