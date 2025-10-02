function TextLink({message, link}){
    return(
        <a href={`${link}`} target="_blank" className={`text-indigo-700 font-[600] m-0 p-0`}>{message}</a>
    )
}

export default TextLink;