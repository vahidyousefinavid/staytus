import { formatDate } from "@/utils/formatDate.util"
import { useState } from "react"

interface cardProps {
    created: string
    name: string
    climate: string
    films: any
    population: any

}

const CardComponent = (props: cardProps) => {
    const [collapse, setCollapse] = useState(false)
    // Truncate population to two significant digits
    let truncatedPopulation = (Math.round(props.population / 1e9) / 1e2);

    return (
        <a
            className="group rounded-lg border bg-[#27272a] border-transparent px-2 py-2 transition-colors flex"
            target="_blank"
            rel="noopener noreferrer"
        >
            <div
                className="group border bg-[#3f3f46] border-transparent px-1 py-1 transition-colors flex w-full"
            >

                <div
                    className="group relative rounded-lg border bg-[#27272a] border-transparent px-9 py-6 transition-colors w-full flex-row"
                >
                    <div
                        className="flex justify-between w-full"
                    >
                        <h2
                            className="text-[yellow]">
                            {formatDate(props.created)}
                        </h2>
                        <h2 className="text-[yellow] max-[800px]:hidden">
                            {formatDate(props.created)}
                        </h2>

                    </div>
                    <div className="flex justify-between mt-4 gap-6 w-full">
                        <div className="flex flex-row gap-3">
                            <div className="flex flex-col">
                                <div className="flex justify-center items-center min-w-[50px] h-[50px] bg-[#3f3f46] rounded-[15px] text-[yellow]">
                                    {/* <img style={{ width: '35px', height: "35px", color: 'yellow !important', filter: 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(34deg) brightness(118%) contrast(119%)' }} color="red" src='/images/tooth.svg' alt='application-management' /> */}
                                    {truncatedPopulation}
                                </div>
                            </div>

                            <div className="flex flex-col justify-start items-start">
                                <h2>
                                    {props.name}
                                </h2>
                                <h2 className="text-[#898484] min-[800px]:hidden ">
                                    {props?.climate}
                                </h2>
                                <div className="text-[#898484] max-[800px]:hidden">
                                    {props.films.map((film: any, index: number) => {
                                        if (index === props.films.length - 1) {
                                            return film?.title
                                        } else {
                                            return film?.title + ','
                                        }
                                    })}
                                </div>
                            </div>

                        </div>
                        <div className="flex justify-center items-center">
                            <h2 className="text-[#898484] max-[800px]:hidden ">
                                {props?.climate}
                            </h2>
                            <span onClick={() => { setCollapse(!collapse) }} className="inline-block w-10 cursor-pointer right-5 bottom-[2%] absolute transform rotate-90 transition-transform group-hover:translate-y-1 motion-reduce:transform-none">
                                &gt;
                            </span>
                        </div>
                    </div>
                    <div className={`transition-all delay-150 duration-300 overflow-hidden ${collapse ? 'max-h-[400px]' : 'max-h-[0px]'} transition-all delay-150 duration-300 overflow-hidden w-full display content-center `}>
                        <div className="p-5">
                            More info
                        </div>
                    </div>
                    <div className="flex text-start pt-2 justify-start text-[#898484] min-[800px]:hidden text-[#fff]">
                        {props.films.map((film: any, index: number) => {
                            if (index === props.films.length - 1) {
                                return film?.title
                            } else {
                                return film?.title + ','
                            }
                        })}
                    </div>
                </div>
            </div>
        </a>
    )
}

export default CardComponent