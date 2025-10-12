import { UserRoundCheck } from 'lucide-react';

function CardFeddback({message}){
    return (
        <div className={`absolute flex items-center ${message !== "undefined" ? "translate-x-[-24px] pr-[12px] opacity-100 right-0" : "translate-x-full p-0 opacity-0 right-[-200px]"} transition transform ease-in-out duration-700 rounded-md text-slate-50 bg-indigo-200 shadow-md`}>
            <div className="bg-indigo-300 h-[50px] w-[40px] rounded-tl-md rounded-bl-md flex items-center justify-center">
                <UserRoundCheck />
            </div>
            <h1 className="ml-[12px]">{message}</h1>
        </div>
    )
}

export default CardFeddback;