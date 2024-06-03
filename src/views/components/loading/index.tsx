
const Loading = () => {
    return (
        <div className="border border-gray-300 shadow rounded-md p-4 w-full ">
            <div className="animate-pulse flex space-x-4 space-y-4 flex-col">
                <div className="flex row justify-between w-full h-3">
                    <div className="h-4 bg-gray-400 rounded w-1/6"></div>
                    <div className="h-4 bg-gray-400 rounded w-1/6 max-[800px]:hidden "></div>
                </div>
                <div className="flex row justify-between w-full space-x-4">
                    <div className="flex justify-center items-center">
                        <div className="rounded-full bg-gray-400 h-14 w-14"></div>
                    </div>
                    <div className="flex-1 space-y-4 py-1">
                        <div className="space-y-4 flex w-full flex-col">
                            <div className="h-4 bg-gray-400 rounded w-1/6 max-[800px]:w-1/6"></div>
                            <div className="h-4 bg-gray-400 rounded w-1/6 max-[800px]:w-2/6"></div>
                        </div>
                    </div>
                    <div className="space-y-4 py-1 pr-4 flex items-center justify-center ">
                        <div className="space-y-4 flex w-full flex-col items-center justify-center h-100 max-[800px]:hidden">
                            <div className="h-4 bg-gray-400 rounded w-[100px]"></div>
                        </div>
                    </div>
                </div>
                <div className="h-4 bg-gray-400 rounded w-4/6 min-[800px]:hidden max-[800px]:w-4/6"></div>
            </div>
        </div>
    )
}

export default Loading