"use client"


export default function Landing(){

    return (
        <div>
            <nav className="border-b border-gray-200 h-15">
                <div className="">
                    <div className="flex justify-between items-center w-full h-15 mb-4">
                       <div className="pl-50 text-2xl font-bold font-sans flex ">
                        <div className="mr-1 ml-1 mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="25" viewBox="0 0 640 512"><path fill="#fa0000" d="M322.1 252l0-1-51.2-65.8s-12 1.6-25 15.1c-9 9.3-242.1 239.1-243.4 240.9-7 10 1.6 6.8 15.7 1.7 .8 0 114.5-36.6 114.5-36.6 .5-.6-.1-.1 .6-.6-.4-5.1-.8-26.2-1-27.7-.6-5.2 2.2-6.9 7-8.9l92.6-33.8c.6-.8 88.5-81.7 90.2-83.3zM482.2 372.1c13.3 16.1 20.7 13.3 30.8 9.3 3.2-1.2 115.4-47.6 117.8-48.9 8-4.3-1.7-16.7-7.2-23.4-2.1-2.5-205.1-245.6-207.2-248.3-9.7-12.2-14.3-12.9-38.4-12.8-10.2 0-106.8 .5-116.5 .6-19.2 .1-32.9-.3-19.2 16.9 7.7 9.5 234.2 299.7 239.9 306.6zm152.7 1.6c-2.3-.3-24.6-4.7-38-7.2 0 0-115 50.4-117.5 51.6-16 7.3-26.9-3.2-36.7-14.6l-57.1-74c-5.4-.9-60.4-9.6-65.3-9.3-3.1 .2-9.6 .8-14.4 2.9-4.9 2.1-145.2 52.8-150.2 54.7-5.1 2-11.4 3.6-11.1 7.6 .2 2.5 2 2.6 4.6 3.5 2.7 .8 300.9 67.6 308 69.1 15.6 3.3 38.5 10.5 53.6 1.7 2.1-1.2 123.8-76.4 125.8-77.8 5.4-4 4.3-6.8-1.7-8.2z"/></svg>
                        </div>
                        <div className="mr-2">
                            <a>Zerodha</a>
                        </div>
                       </div>
                       <div className="mr-35 text-md font-sans flex">
                        <div className="mr-14 cursor-pointer  hover:text-red-500">Signup</div>
                        <div className="mr-14 cursor-pointer  hover:text-red-500">About</div>
                        <div className="mr-14 cursor-pointer  hover:text-red-500">Products</div>
                        <div className="mr-14 cursor-pointer  hover:text-red-500">Pricing</div>
                       </div>
                    </div>
                </div>
            </nav>

            <div className="">
                <div className="flex flex-row">
                    <div className="ml-25 mt-38 h-50">
                <div className="font-sans font-semibold text-6xl tracking-tighter ">
                    Open Trade Account<br/>
                    <div className="mt-3">
                        within minutes 
                    </div>
                </div>
                <div className="font-sans text-[18px] tracking-[2.3px] mt-4 ml-2">
                    START NOW , GROW NOW , LEARN NOW
                    <div className=" mt-6 flex-row">
                        <div className="flex">
                            <p className="text-6xl font-bold w-18">₹0</p>
                            <p className="ml-2 mt-1 w-60 font-sans tracking-[1.1px]">charges to start trading <br/> and stocks</p>
                            <div className="mb-30">
                        <p className="text-6xl font-bold w-18 ml-15 flex-row">₹20</p>
                       </div>
                       <div className="ml-10 w-50 mb-30 mt-2"><p>For a premium <br/>account</p></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-150 w-170 ml-30">
                <img src="../assets/iphone-model.png"></img>
            </div>
            </div>
            </div>

            {/* Second Hero Section */}
            
            <div className="bg-red-500 w-full mt-4 h-200">
                <div className="bg-red-600 w-full h-30 flex justify-between">
                        <div className="text-[20px] font-sans font-semibold text-white ml-40 mr-35 mt-7">
                            1.1k Trusted <br/>
                            <div className="font-sans font-light text-[14px]">
                            Loved and Trusted
                            </div>
                        </div>
                        <div className="text-[20px] font-sans font-semibold text-white mt-7 mr-30">
                            4.4 avg rating <br/>
                            <div className="font-sans font-light text-[14px]">
                                average app rating
                            </div>
                        </div>
                        <div className="text-[20px] font-sans font-semibold text-white mt-7 mr-40">
                            Backed by Zerodha <br/>
                            <div className="font-sans font-light text-[14px] ml-9">
                                Zerodha pvt.ltd
                            </div>
                        </div>
                </div>

                <div>
                    <p className="text-6xl text-white font-sans font-semibold ml-20 mt-33">Open One Trade Account <br/> Multiple options.</p>
                </div>

                <div className="flex mt-20 ">
                    <div className="bg-white h-45 w-80 mr-10 ml-18 rounded-2xl">
                    </div>
                    <div className="bg-white h-45 w-80 rounded-2xl">
                    </div>
                    <div className="bg-white h-45 w-80 ml-8 rounded-2xl">
                    </div>
                    <div className="bg-white h-45 w-80 ml-8 rounded-2xl">
                    </div>
                </div>
            </div>
            <div className="bg-white w-full h-100">

            </div>

        </div>
    )
}