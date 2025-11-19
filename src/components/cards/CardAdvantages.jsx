function CardAdventages({ image, h2, p }){
    return (
        <div className="
            w-full
            max-w-[400px]
        ">
            <div className="
                w-full
                h-auto
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
                items-center
                flex-col
            ">
                <h2 className="
                    text-[1.675rem]
                    leading-normal
                    text-[#FFFAFE]
                    font-bold
                    font-DmSans
                    mb-[12px]
                    text-center
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
                    max-w-[250px]
                ">
                    {p}
                </p>
            </div>
        </div>
    )
}

export default CardAdventages