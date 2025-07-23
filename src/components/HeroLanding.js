// "use client"
// import Button from "./ui/button"
// import { useRouter } from "next/navigation"
// import Footer from "./Footer";


// export default function HeroLanding() {
//     const router = useRouter()
//     return (
//         <>
//             <section className="relative min-h-screen bg-white overflow-hidden">
//                 {/* Main Content */}
//                 <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="pt-20 pb-16 text-center lg:pt-32">
//                         <div className="mx-auto max-w-4xl">
//                             <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-gray-800 leading-tight animate-fade-in-up animation-delay-100">
//                                 Smart. Secure. Scalable
//                             </h1>
//                             <p className="mt-6 text-xl sm:text-2xl text-gray-500 font-medium animate-fade-in-up animation-delay-300">
//                                 Built for a Growing India. Powered by Finhub.
//                             </p>
//                             <div className="mt-10 animate-fade-in-up animation-delay-500">
//                                 <Button
//                                     onClick={() => router.push("/login")}
//                                     variant="default"
//                                     size="lg"
//                                     className="px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-[#00d09c] to-[#00b98b] transition-transform hover:scale-105"
//                                 >
//                                     Get started
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 {/* Decorative Background Elements */}
//                 <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden">
//                     <div className="absolute bottom-0 left-0 w-full h-full">
//                         {/* Left side buildings */}
//                         <div className="absolute bottom-0 left-8 lg:left-16 animate-float-subtle animation-delay-700">
//                             <div className="w-16 h-20 bg-gradient-to-t from-blue-100 to-blue-200 transform rotate-12 rounded-sm opacity-60"></div>
//                             <div className="w-12 h-16 bg-gradient-to-r from-[#00d09c] to-[#00b98b] transform -rotate-6 rounded-sm opacity-50 ml-4 -mt-4"></div>
//                         </div>
//                         {/* Center elements */}
//                         <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-float-subtle animation-delay-900">
//                             <div className="w-20 h-12 bg-gradient-to-t from-blue-100 to-blue-200 rounded-lg opacity-40"></div>
//                             <div className="w-16 h-8 bg-gradient-to-r from-[#00d09c] to-[#00b98b] rounded-lg opacity-50 ml-8 -mt-2"></div>
//                         </div>
//                         {/* Right side elements */}
//                         <div className="absolute bottom-0 right-8 lg:right-16 animate-float-subtle animation-delay-1100">
//                             <div className="w-18 h-24 bg-gradient-to-t from-blue-100 to-blue-200 transform -rotate-12 rounded-sm opacity-60"></div>
//                             <div className="w-14 h-18 bg-gradient-to-r from-[#00d09c] to-[#00b98b] transform rotate-6 rounded-sm opacity-50 mr-4 -mt-6"></div>
//                         </div>
//                         {/* Additional decorative shapes */}
//                         <div className="absolute bottom-4 left-1/4 animate-float-subtle animation-delay-1300">
//                             <div className="w-8 h-8 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full opacity-30"></div>
//                         </div>
//                         <div className="absolute bottom-8 right-1/4 animate-float-subtle animation-delay-1500">
//                             <div className="w-6 h-6 bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-full opacity-40"></div>
//                         </div>
//                     </div>
//                 </div>

//             </section>
//             <div>
//                 <Footer />
//             </div>
//         </>
//     )
// }


"use client"
import Button from "./ui/button"
import { useRouter } from "next/navigation"
import Footer from "./Footer";

export default function HeroLanding() {
    const router = useRouter()
    return (
        <>
            <section className="relative min-h-screen bg-white overflow-hidden">
                {/* Main Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="pt-20 pb-16 text-center lg:pt-32">
                        <div className="mx-auto max-w-4xl">
                            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-gray-800 leading-tight animate-fade-in-up animation-delay-100">
                                Smart. Secure. Scalable

                            </h1>
                            <p className="mt-6 text-xl sm:text-2xl text-gray-500 font-medium animate-fade-in-up animation-delay-300 relative">
                                Built for a Growing India. Powered by Finhub.

                            </p>
                            <div className="mt-10 animate-fade-in-up animation-delay-2000">
                                <Button
                                    onClick={() => router.push("/login")}
                                    variant="default"
                                    size="lg"
                                    className="px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-[#00d09c] to-[#00b98b] 
              transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
              hover:scale-[0.98] hover:shadow-lg hover:shadow-[#00d09c]/40 
              active:scale-95 active:shadow-[#00d09c]/20 transform-gpu"
                                >
                                    Get started
                                    <span className="ml-2 inline-block animate-[bounce_1.5s_infinite_2000ms]">→</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Decorative Background Elements */}
                <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-full">
                        {/* Floating particles */}
                        <div className="absolute top-1/4 left-1/5 w-2 h-2 bg-[#00d09c] rounded-full animate-float opacity-70 animation-delay-200"></div>
                        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-300 rounded-full animate-float animation-delay-400 opacity-60"></div>
                        <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-emerald-200 rounded-full animate-float animation-delay-600 opacity-50"></div>

                        {/* Left side buildings */}
                        <div className="absolute bottom-0 left-8 lg:left-16 animate-float-subtle animation-delay-700">
                            <div className="w-16 h-20 bg-gradient-to-t from-blue-100 to-blue-200 transform rotate-12 rounded-sm opacity-60 transition-all hover:opacity-80"></div>
                            <div className="w-12 h-16 bg-gradient-to-r from-[#00d09c] to-[#00b98b] transform -rotate-6 rounded-sm opacity-50 ml-4 -mt-4 transition-all hover:opacity-70"></div>
                        </div>
                        {/* Center elements */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-float-subtle animation-delay-900 group">
                            <div className="w-20 h-12 bg-gradient-to-t from-blue-100 to-blue-200 rounded-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                            <div className="w-16 h-8 bg-gradient-to-r from-[#00d09c] to-[#00b98b] rounded-lg opacity-50 ml-8 -mt-2 group-hover:opacity-70 transition-opacity"></div>
                        </div>
                        {/* Right side elements */}
                        <div className="absolute bottom-0 right-8 lg:right-16 animate-float-subtle animation-delay-1100">
                            <div className="w-18 h-24 bg-gradient-to-t from-blue-100 to-blue-200 transform -rotate-12 rounded-sm opacity-60 transition-all hover:opacity-80"></div>
                            <div className="w-14 h-18 bg-gradient-to-r from-[#00d09c] to-[#00b98b] transform rotate-6 rounded-sm opacity-50 mr-4 -mt-6 transition-all hover:opacity-70"></div>
                        </div>
                        {/* Additional decorative shapes */}
                        <div className="absolute bottom-4 left-1/4 animate-float-subtle animation-delay-1300 hover:animate-spin-slow">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full opacity-30"></div>
                        </div>
                        <div className="absolute bottom-8 right-1/4 animate-float-subtle animation-delay-1500 hover:animate-ping">
                            <div className="w-6 h-6 bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-full opacity-40"></div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="animate-fade-in animation-delay-1700">
                <Footer />
            </div>
        </>
    )
}