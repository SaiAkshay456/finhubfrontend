import Button from "./ui/button"
import { useRouter } from "next/navigation"
import Footer from "./Footer";
export default function HeroLanding() {
    const router = useRouter();
    return (
        <>
            <section className="relative min-h-screen bg-white overflow-hidden">
                {/* Main Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="pt-20 pb-16 text-center lg:pt-32">
                        <div className="mx-auto max-w-4xl">
                            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
                                Smart. Secure. Scalable
                            </h1>

                            <p className="mt-6 text-xl sm:text-2xl text-gray-500 font-medium">
                                Built for a Growing India. Powered by Finhub.
                            </p>

                            <div className="mt-10">
                                <Button
                                    onClick={() => router.push("/login")}
                                    variant="primary"
                                    size="xl"
                                    className="px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-[#00d09c] to-[#00b98b]"
                                >
                                    Get started
                                </Button>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Background Elements */}
                <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-full">
                        {/* Left side buildings */}
                        <div className="absolute bottom-0 left-8 lg:left-16">
                            <div className="w-16 h-20 bg-gradient-to-t from-blue-100 to-blue-200 transform rotate-12 rounded-sm opacity-60"></div>
                            <div className="w-12 h-16 bg-gradient-to-r from-[#00d09c] to-[#00b98b] transform -rotate-6 rounded-sm opacity-50 ml-4 -mt-4"></div>
                        </div>

                        {/* Center elements */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                            <div className="w-20 h-12 bg-gradient-to-t from-blue-100 to-blue-200 rounded-lg opacity-40"></div>
                            <div className="w-16 h-8 bg-gradient-to-r from-[#00d09c] to-[#00b98b] rounded-lg opacity-50 ml-8 -mt-2"></div>
                        </div>

                        {/* Right side elements */}
                        <div className="absolute bottom-0 right-8 lg:right-16">
                            <div className="w-18 h-24 bg-gradient-to-t from-blue-100 to-blue-200 transform -rotate-12 rounded-sm opacity-60"></div>
                            <div className="w-14 h-18  bg-gradient-to-r from-[#00d09c] to-[#00b98b] transform rotate-6 rounded-sm opacity-50 mr-4 -mt-6"></div>
                        </div>

                        {/* Additional decorative shapes */}
                        <div className="absolute bottom-4 left-1/4">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full opacity-30"></div>
                        </div>
                        <div className="absolute bottom-8 right-1/4">
                            <div className="w-6 h-6 bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-full opacity-40"></div>
                        </div>
                    </div>
                </div>
            </section>
            <div>
                <Footer />
            </div>
        </>
    )
}
