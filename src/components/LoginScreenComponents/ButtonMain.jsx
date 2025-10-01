function ButtonMain({link}){

    function Enter(){
        console.log(link);
         // Não está pronto!
    }

    return (
        <button onClick={() => Enter()} className="bg-indigo-500 w-full text-slate-50 py-2 rounded-full mt-[90px] font-[500]">ENTRAR</button>
    )
}

export default ButtonMain;