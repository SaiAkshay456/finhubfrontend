// components/SubscriptionModal.tsx
"use client";

import { CheckIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { MdOutlineUnsubscribe } from "react-icons/md";
export function SubscriptionModal() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>

            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 rounded-md bg-gradient-to-r from-[#00d09c] to-[#00b98b] px-4 py-2 border border-transparent text-base font-medium text-white transition-colors cursor-pointer"
                aria-label="Subscribe"
            >
                <MdOutlineUnsubscribe className="text-lg" />
                Upgrade Plan
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-screen items-center justify-center p-4">
                        <div
                            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />
                        <div className="relative z-10 w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                            >
                                <XIcon className="h-6 w-6" />
                            </button>
                            <div className="px-6 py-8 sm:px-8">
                                <div className="text-center">
                                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                        Choose Plan
                                    </h1>
                                    <p className="mt-2 text-gray-600">
                                        Flexible pricing options to suit your needs
                                    </p>
                                </div>
                                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
                                        <div className="mb-3">
                                            <h2 className="text-lg font-bold text-gray-900">Basic</h2>
                                            <p className="mt-1 text-sm text-gray-600">
                                                Perfect for individuals getting started
                                            </p>
                                        </div>
                                        <div className="mb-4">
                                            <span className="text-2xl font-bold text-gray-900">$9</span>
                                            <span className="text-gray-500">/month</span>
                                        </div>
                                        <ul className="space-y-2">
                                            <PlanFeature text="10 projects" />
                                            <PlanFeature text="5 team members" />
                                            <PlanFeature text="Basic analytics" />
                                            <PlanFeature text="Email support" />
                                            <PlanFeature text="Limited storage" disabled />
                                            <PlanFeature text="API access" disabled />
                                        </ul>
                                        <button className="mt-4 w-full rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800">
                                            Get Started
                                        </button>
                                    </div>

                                    {/* Pro Plan (Featured) */}
                                    <div className="relative rounded-xl border-2 border-indigo-600 bg-white p-4 shadow-lg">
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 transform rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-medium text-white">
                                            Most Popular
                                        </div>
                                        <div className="mb-3">
                                            <h2 className="text-lg font-bold text-gray-900">Pro</h2>
                                            <p className="mt-1 text-sm text-gray-600">
                                                Best for growing teams
                                            </p>
                                        </div>
                                        <div className="mb-4">
                                            <span className="text-2xl font-bold text-gray-900">$29</span>
                                            <span className="text-gray-500">/month</span>
                                        </div>
                                        <ul className="space-y-2">
                                            <PlanFeature text="Unlimited projects" />
                                            <PlanFeature text="20 team members" />
                                            <PlanFeature text="Advanced analytics" />
                                            <PlanFeature text="Priority support" />
                                            <PlanFeature text="100GB storage" />
                                            <PlanFeature text="API access" />
                                        </ul>
                                        <button className="mt-4 w-full rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700">
                                            Get Started
                                        </button>
                                    </div>

                                    {/* Enterprise Plan */}
                                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
                                        <div className="mb-3">
                                            <h2 className="text-lg font-bold text-gray-900">Enterprise</h2>
                                            <p className="mt-1 text-sm text-gray-600">
                                                For organizations with custom needs
                                            </p>
                                        </div>
                                        <div className="mb-4">
                                            <span className="text-2xl font-bold text-gray-900">$99</span>
                                            <span className="text-gray-500">/month</span>
                                        </div>
                                        <ul className="space-y-2">
                                            <PlanFeature text="Unlimited projects" />
                                            <PlanFeature text="Unlimited team members" />
                                            <PlanFeature text="Advanced analytics" />
                                            <PlanFeature text="24/7 support" />
                                            <PlanFeature text="1TB storage" />
                                            <PlanFeature text="Full API access" />
                                        </ul>
                                        <button className="mt-4 w-full rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800">
                                            Contact Sales
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-6 rounded-lg bg-gray-50 p-4 text-center">
                                    <h3 className="text-base font-medium text-gray-900">
                                        Not sure which plan is right for you?
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-600">
                                        Contact our sales team to discuss your needs.
                                    </p>
                                    <button className="mt-2 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700">
                                        Contact Us
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function PlanFeature({
    text,
    disabled = false,
}) {
    return (
        <li className="flex items-start">
            <CheckIcon
                className={`mr-2 h-4 w-4 flex-shrink-0 mt-0.5 ${disabled ? "text-gray-300" : "text-indigo-500"
                    }`}
            />
            <span className={`text-sm ${disabled ? "text-gray-400" : "text-gray-700"}`}>
                {text}
            </span>
        </li>
    );
}