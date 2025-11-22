import SectionWrapperA from "../components/wrappers/home/SectionWrapperA";
import { useTheme } from "../contexts/theme/useTheme";
import { cloudinary } from "../cloud/cloudinary";
import SectionWrapperB from "../components/wrappers/home/SectionWrapperB";
import SectionWrapperC from "../components/wrappers/home/SectionWrapperC";
import SectionWrapperD from "../components/wrappers/home/SectionWrapperD";

function About () {

    const { theme, validateTheme } = useTheme();
    

    return (
        <div
            className={`
                w-full
                h-full
                ${validateTheme(theme,"bg-[#FAFAFA]","bg-slate-900")}
        `}>
            <div className={`
                w-full
                h-full
                md:py-[60px]
                py-[32px]
                ${validateTheme(theme, "bg-slate-50", "bg-slate-800")}
                flex
                justify-center
                items-center
            `}>
                <h1 className={`
                    font-DmSans
                    md:text-[3.275rem]
                    text-[3rem]
                    font-bold
                    md:leading-[3.975rem]
                    leading-[2.675rem]
                    text-sky-300
                `}>
                    Sobre nós
                </h1>
            </div>
            <SectionWrapperB 
                cloudinary={cloudinary}
                h1={"Nossa história"} 
                text={"When I opened Sugarplum Cake Shoppe in 2010, I began with the question, “What makes people smile?” I found that what brings a smile to any face is the perfectly baked treat, and while my business has grown and changed, this focus has stayed the same. My team and I strive to serve in a way that meets your goal. We believe that each sweet treat is an opportunity to bring joy to another person’s world. If You Can Dream It, We Can Bake It!"}
                path={"/home"}
            />
            <SectionWrapperA 
                theme={theme} 
                cloudinary={cloudinary} 
                h1={"Nossa Missão"} 
                text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem facilisis egestas varius consequat massa quis. Nisl orci sed elementum lobortis viverra egestas. Quam sed elementum augue sed semper. Eget convallis pellentesque tortor, urna. Venenatis tincidunt duis nunc, aliquam augue velit. At aliquam mauris mollis fames viverra volutpat cursus et pharetra. Non vulputate placerat in eget elementum. Sagittis eget consectetur dui faucibus. Vestibulum nunc eu neque sed eget tincidunt platea. Velit gravida adipiscing et "}
                hasButton={false}
                path={"/about"}
            />
        </div>
    )
}

export default About;