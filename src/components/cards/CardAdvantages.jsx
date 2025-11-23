function CardAdventages({ image, h2, p }){
    return (
        <div className="
            w-full
            md:max-w-[400px]
        ">
            <div className="
                w-full
                h-[64px]
                flex
                justify-center
                items-center
                mb-[20px]
            ">
                <img 
                    src={image} 
                    alt="" 
                />
            </div>
            <div className="
                w-full
                h-auto
                flex
                justify-center
                md:items-center
                items-start
                flex-col
            ">
                <h2 className="
                    md:text-[1.675rem]
                    text-[1.475rem]
                    leading-normal
                    text-[#FFFAFE]
                    font-bold
                    font-DmSans
                    mb-[12px]
                    md:text-center
                    text-left
                ">
                    {h2}
                </h2>
                <p className="
                    text-[1.175rem]
                    leading-normal
                    text-[#FFFAFE]
                    font-normal
                    font-DmSans
                    mb-[12px]
                    text-left
                    my:max-w-[250px]
                ">
                    {p}
                </p>
            </div>
        </div>
    )
}

export default CardAdventages