'use client';
import Header from '@/components/Header';
import HeroLanding from '@/components/HeroLanding';
import { useAuth } from '@/providers/AuthProvider';
import Statistics from '@/components/Statistics';
export default function HomePage() {
  const { isAuthorized, user } = useAuth();

  if (isAuthorized) {
    return (
      <div>
        <Statistics />
      </div>
    );
  }

  // Show landing page for unauthorized users
  return (
    <>
      <Header />
      <HeroLanding />
    </>
  );
}

// import {
//   Menu,
//   X,
//   ArrowRight,
//   Check,
//   Star,
//   Zap,
//   Shield,
//   Users,
//   BarChart3,
//   Mail,
//   Phone,
//   MapPin,
//   Github,
//   Twitter,
//   Linkedin,
//   CreditCard,
//   Banknote,
//   LineChart,
//   Lock
// } from 'lucide-react';

// export function ComponentUser() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [email, setEmail] = useState('');

//   const features = [
//     {
//       icon: <Zap className="w-6 h-6" />,
//       title: "Instant Transactions",
//       description: "Send and receive money in seconds with our lightning-fast payment processing technology."
//     },
//     {
//       icon: <Shield className="w-6 h-6" />,
//       title: "Bank-Level Security",
//       description: "256-bit encryption and multi-factor authentication keep your financial data completely secure."
//     },
//     {
//       icon: <CreditCard className="w-6 h-6" />,
//       title: "Smart Budgeting",
//       description: "AI-powered insights help you track spending and optimize your financial health automatically."
//     },
//     {
//       icon: <LineChart className="w-6 h-6" />,
//       title: "Investment Tools",
//       description: "Grow your wealth with automated portfolio management and real-time market analytics."
//     }
//   ];

//   const testimonials = [
//     {
//       name: "Raj Patel",
//       role: "CFO",
//       company: "FinTech Innovations",
//       image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
//       content: "We've reduced our payment processing costs by 40% while improving transaction speeds. Game-changing technology!"
//     },
//     {
//       name: "Lisa Wong",
//       role: "Small Business Owner",
//       company: "Wong's Bakery",
//       image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
//       content: "The budgeting tools helped me save $15,000 in my first year. Now I can focus on growing my business."
//     },
//     {
//       name: "David Kim",
//       role: "Personal Investor",
//       company: "",
//       image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
//       content: "Finally an app that makes investing accessible. My portfolio has grown 22% since I started using their tools."
//     }
//   ];

//   const pricingPlans = [
//     {
//       name: "Basic",
//       price: "$0",
//       period: "forever",
//       features: [
//         "Up to 10 transactions/month",
//         "Basic budgeting tools",
//         "Email support",
//         "Mobile banking",
//         "FDIC insured up to $250k"
//       ],
//       popular: false
//     },
//     {
//       name: "Pro",
//       price: "$9",
//       period: "per month",
//       features: [
//         "Unlimited transactions",
//         "Advanced analytics",
//         "Priority support",
//         "Investment tools",
//         "Multi-currency accounts",
//         "2% cash back on debit"
//       ],
//       popular: true
//     },
//     {
//       name: "Enterprise",
//       price: "Custom",
//       period: "per month",
//       features: [
//         "Dedicated account manager",
//         "White-label solutions",
//         "API access",
//         "Custom reporting",
//         "Volume discounts",
//         "24/7 premium support"
//       ],
//       popular: false
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Navigation */}
//       <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <div className="flex-shrink-0 flex items-center">
//                 <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
//                   <Banknote className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="ml-2 text-xl font-bold text-gray-900">Finova</span>
//               </div>
//             </div>

//             <div className="hidden md:block">
//               <div className="ml-10 flex items-baseline space-x-8">
//                 <a href="#features" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Features</a>
//                 <a href="#testimonials" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Testimonials</a>
//                 <a href="#pricing" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Pricing</a>
//                 <a href="#contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Contact</a>
//               </div>
//             </div>

//             <div className="hidden md:block">
//               <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
//                 Open Account
//               </button>
//             </div>

//             <div className="md:hidden">
//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="text-gray-700 hover:text-blue-600 transition-colors"
//               >
//                 {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         {isMenuOpen && (
//           <div className="md:hidden bg-white border-t border-gray-200">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               <a href="#features" className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">Features</a>
//               <a href="#testimonials" className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">Testimonials</a>
//               <a href="#pricing" className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">Pricing</a>
//               <a href="#contact" className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">Contact</a>
//               <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg text-base font-medium">
//                 Open Account
//               </button>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Hero Section */}
//       <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
//               The Future of
//               <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Digital Banking</span>
//             </h1>
//             <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
//               Modern financial tools to help you spend smarter, save more, and grow your wealth.
//               All in one secure platform.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
//                 Open Free Account
//                 <ArrowRight className="ml-2 w-5 h-5" />
//               </button>
//               <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors">
//                 How It Works
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Why Choose Finova?
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Discover the financial tools that help thousands achieve their money goals
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature, index) => (
//               <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 group">
//                 <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
//                   <div className="text-white">
//                     {feature.icon}
//                   </div>
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section id="testimonials" className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Trusted by Customers
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               See what our customers say about managing their money with Finova
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {testimonials.map((testimonial, index) => (
//               <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
//                 <div className="flex items-center mb-4">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                   ))}
//                 </div>
//                 <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
//                 <div className="flex items-center">
//                   <img
//                     src={testimonial.image}
//                     alt={testimonial.name}
//                     className="w-12 h-12 rounded-full mr-4 object-cover"
//                   />
//                   <div>
//                     <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
//                     <p className="text-sm text-gray-500">{testimonial.role} {testimonial.company && `at ${testimonial.company}`}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Pricing Section */}
//       <section id="pricing" className="py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Simple, Transparent Pricing
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Choose the plan that fits your financial needs. No hidden fees, no surprises.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {pricingPlans.map((plan, index) => (
//               <div key={index} className={`bg-white p-8 rounded-xl shadow-sm border-2 hover:shadow-md transition-shadow duration-300 ${plan.popular ? 'border-blue-500 relative' : 'border-gray-200'
//                 }`}>
//                 {plan.popular && (
//                   <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
//                     <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
//                       Most Popular
//                     </span>
//                   </div>
//                 )}
//                 <div className="text-center mb-6">
//                   <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
//                   <div className="mb-4">
//                     <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
//                     {plan.period !== "Custom" && <span className="text-gray-600 ml-2">{plan.period}</span>}
//                   </div>
//                 </div>
//                 <ul className="space-y-3 mb-8">
//                   {plan.features.map((feature, featureIndex) => (
//                     <li key={featureIndex} className="flex items-center">
//                       <Check className="w-5 h-5 text-green-500 mr-3" />
//                       <span className="text-gray-600">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//                 <button className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${plan.popular
//                   ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105'
//                   : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
//                   }`}>
//                   {plan.period === "Custom" ? "Contact Sales" : "Get Started"}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section id="contact" className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Get in Touch
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Have questions about our financial services? We'd love to hear from you.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             <div>
//               <form className="space-y-6">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     placeholder="Your name"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     placeholder="your@email.com"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
//                     Message
//                   </label>
//                   <textarea
//                     id="message"
//                     rows={4}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     placeholder="Tell us about your financial needs..."
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
//                 >
//                   Send Message
//                 </button>
//               </form>
//             </div>

//             <div className="space-y-8">
//               <div className="flex items-center">
//                 <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
//                   <Mail className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">Email</h3>
//                   <p className="text-gray-600">support@finova.com</p>
//                 </div>
//               </div>

//               <div className="flex items-center">
//                 <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
//                   <Phone className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
//                   <p className="text-gray-600">+1 (800) 555-1234</p>
//                 </div>
//               </div>

//               <div className="flex items-center">
//                 <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
//                   <MapPin className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">HQ</h3>
//                   <p className="text-gray-600">456 Finance Street<br />New York, NY 10001</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Newsletter Section */}
//       <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-600">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h2 className="text-3xl font-bold text-white mb-4">
//               Financial Insights
//             </h2>
//             <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//               Get weekly money tips, market updates, and exclusive offers.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500"
//               />
//               <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
//                 Subscribe
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center mb-4">
//                 <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
//                   <Banknote className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="ml-2 text-xl font-bold">Finova</span>
//               </div>
//               <p className="text-gray-400 mb-4">
//                 Modern financial tools for a smarter financial future.
//               </p>
//               <div className="flex space-x-4">
//                 <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                   <Twitter className="w-5 h-5" />
//                 </a>
//                 <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                   <Linkedin className="w-5 h-5" />
//                 </a>
//                 <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                   <Github className="w-5 h-5" />
//                 </a>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold mb-4">Products</h3>
//               <ul className="space-y-2">
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Digital Banking</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Investing</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Loans</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Business Accounts</a></li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold mb-4">Company</h3>
//               <ul className="space-y-2">
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold mb-4">Resources</h3>
//               <ul className="space-y-2">
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Regulatory</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FDIC Information</a></li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 mt-8 pt-8 text-center">
//             <p className="text-gray-400">
//               © 2025 Finova. All rights reserved. Finova is a financial technology company, not a bank. Banking services provided by our partner banks, Member FDIC.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

//second one
// import React, { useState } from 'react';
// import {
//   Menu,
//   X,
//   ArrowRight,
//   Check,
//   Star,
//   Shield,
//   TrendingUp,
//   CreditCard,
//   Smartphone,
//   Lock,
//   BarChart3,
//   DollarSign,
//   Mail,
//   Phone,
//   MapPin,
//   Github,
//   Twitter,
//   Linkedin,
//   Globe,
//   Zap,
//   Users,
//   PieChart,
//   Wallet
// } from 'lucide-react';
// import { useRouter } from "next/navigation";

// export function ComponentUser() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [email, setEmail] = useState('');
//   const router = useRouter();

//   const features = [
//     {
//       icon: <Shield className="w-6 h-6" />,
//       title: "Bank-Grade Security",
//       description: "256-bit SSL encryption and multi-factor authentication protect your financial data with enterprise-level security."
//     },
//     {
//       icon: <TrendingUp className="w-6 h-6" />,
//       title: "Smart Analytics",
//       description: "AI-powered insights help you track spending, optimize investments, and make informed financial decisions."
//     },
//     {
//       icon: <CreditCard className="w-6 h-6" />,
//       title: "Instant Payments",
//       description: "Send and receive money instantly with our advanced payment processing technology and global network."
//     },
//     {
//       icon: <Smartphone className="w-6 h-6" />,
//       title: "Mobile First",
//       description: "Manage your finances on-the-go with our award-winning mobile app, available on iOS and Android."
//     }
//   ];

//   const testimonials = [
//     {
//       name: "David Kim",
//       role: "CFO",
//       company: "TechStartup Inc",
//       image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
//       content: "FinanceFlow has revolutionized our financial operations. The automation features saved us 40 hours per week."
//     },
//     {
//       name: "Maria Rodriguez",
//       role: "Finance Director",
//       company: "Global Ventures",
//       image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
//       content: "The real-time analytics and reporting capabilities have given us unprecedented visibility into our cash flow."
//     },
//     {
//       name: "James Thompson",
//       role: "Small Business Owner",
//       company: "Thompson & Co",
//       image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
//       content: "Finally, a financial platform that understands small business needs. The payment processing is lightning fast."
//     }
//   ];

//   const pricingPlans = [
//     {
//       name: "Starter",
//       price: "$29",
//       period: "per month",
//       features: [
//         "Up to 100 transactions/month",
//         "Basic financial analytics",
//         "Mobile app access",
//         "Email support",
//         "Standard payment processing",
//         "Basic security features"
//       ],
//       popular: false
//     },
//     {
//       name: "Business",
//       price: "$99",
//       period: "per month",
//       features: [
//         "Up to 1,000 transactions/month",
//         "Advanced analytics & reporting",
//         "Multi-user access",
//         "Priority support",
//         "API access",
//         "Advanced fraud protection",
//         "Custom integrations",
//         "Dedicated account manager"
//       ],
//       popular: true
//     },
//     {
//       name: "Enterprise",
//       price: "$299",
//       period: "per month",
//       features: [
//         "Unlimited transactions",
//         "Custom analytics dashboard",
//         "White-label solution",
//         "24/7 dedicated support",
//         "Advanced compliance tools",
//         "Custom security protocols",
//         "On-premise deployment",
//         "SLA guarantee"
//       ],
//       popular: false
//     }
//   ];

//   const stats = [
//     { number: "$2.5B+", label: "Transactions Processed" },
//     { number: "50K+", label: "Active Users" },
//     { number: "99.9%", label: "Uptime Guarantee" },
//     { number: "150+", label: "Countries Supported" }
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Navigation */}
//       <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <div className="flex-shrink-0 flex items-center">
//                 <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
//                   <DollarSign className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="ml-2 text-xl font-bold text-gray-900">FinanceFlow</span>
//               </div>
//             </div>

//             <div className="hidden md:block">
//               <div className="ml-10 flex items-baseline space-x-8">
//                 <a href="#features" className="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">Features</a>
//                 <a href="#solutions" className="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">Solutions</a>
//                 <a href="#pricing" className="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">Pricing</a>
//                 <a href="#security" className="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">Security</a>
//                 <a href="#contact" className="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">Contact</a>
//               </div>
//             </div>

//             <div className="hidden md:flex items-center space-x-4">
//               <button onClick={() => router.push("/login")} className="text-gray-700 hover:text-emerald-600 px-4 py-2 text-sm font-medium transition-colors">
//                 Sign In
//               </button>
//               <button className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
//                 Get Started
//               </button>
//             </div>

//             <div className="md:hidden">
//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="text-gray-700 hover:text-emerald-600 transition-colors"
//               >
//                 {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         {isMenuOpen && (
//           <div className="md:hidden bg-white border-t border-gray-200">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               <a href="#features" className="block text-gray-700 hover:text-emerald-600 px-3 py-2 text-base font-medium">Features</a>
//               <a href="#solutions" className="block text-gray-700 hover:text-emerald-600 px-3 py-2 text-base font-medium">Solutions</a>
//               <a href="#pricing" className="block text-gray-700 hover:text-emerald-600 px-3 py-2 text-base font-medium">Pricing</a>
//               <a href="#security" className="block text-gray-700 hover:text-emerald-600 px-3 py-2 text-base font-medium">Security</a>
//               <a href="#contact" className="block text-gray-700 hover:text-emerald-600 px-3 py-2 text-base font-medium">Contact</a>
//               <div className="pt-4 pb-2 border-t border-gray-200">
//                 <button onClick={() => router.push("/login")} className="block w-full text-left text-gray-700 hover:text-emerald-600 px-3 py-2 text-base font-medium">Sign In</button>
//                 <button className="w-full mt-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-4 py-2 rounded-lg text-base font-medium">
//                   Get Started
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Hero Section */}
//       <section className="pt-20 pb-16 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-6">
//               <Lock className="w-4 h-4 mr-2" />
//               SOC 2 Type II Certified & PCI DSS Compliant
//             </div>
//             <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
//               The Future of
//               <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"> Financial Technology</span>
//             </h1>
//             <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
//               Streamline payments, automate financial operations, and gain real-time insights with our
//               enterprise-grade fintech platform trusted by thousands of businesses worldwide.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
//               <button className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
//                 Start Free Trial
//                 <ArrowRight className="ml-2 w-5 h-5" />
//               </button>
//               <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors">
//                 Schedule Demo
//               </button>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
//               {stats.map((stat, index) => (
//                 <div key={index} className="text-center">
//                   <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
//                   <div className="text-sm text-gray-600">{stat.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Built for Modern Finance
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Powerful features designed to streamline your financial operations and accelerate business growth
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature, index) => (
//               <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 group hover:border-emerald-200">
//                 <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
//                   <div className="text-white">
//                     {feature.icon}
//                   </div>
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Solutions Section */}
//       <section id="solutions" className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Complete Financial Solutions
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               From payments to analytics, we provide everything you need to manage your finances efficiently
//             </p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300">
//               <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
//                 <Wallet className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">Digital Payments</h3>
//               <p className="text-gray-600 mb-6">
//                 Process payments instantly with our secure, scalable payment infrastructure. Support for cards,
//                 bank transfers, and digital wallets.
//               </p>
//               <ul className="space-y-2">
//                 <li className="flex items-center text-gray-600">
//                   <Check className="w-4 h-4 text-emerald-500 mr-2" />
//                   Real-time payment processing
//                 </li>
//                 <li className="flex items-center text-gray-600">
//                   <Check className="w-4 h-4 text-emerald-500 mr-2" />
//                   Multi-currency support
//                 </li>
//                 <li className="flex items-center text-gray-600">
//                   <Check className="w-4 h-4 text-emerald-500 mr-2" />
//                   Fraud detection & prevention
//                 </li>
//               </ul>
//             </div>

//             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300">
//               <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
//                 <PieChart className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">Financial Analytics</h3>
//               <p className="text-gray-600 mb-6">
//                 Get deep insights into your financial performance with advanced analytics, custom reports,
//                 and predictive modeling.
//               </p>
//               <ul className="space-y-2">
//                 <li className="flex items-center text-gray-600">
//                   <Check className="w-4 h-4 text-emerald-500 mr-2" />
//                   Real-time dashboards
//                 </li>
//                 <li className="flex items-center text-gray-600">
//                   <Check className="w-4 h-4 text-emerald-500 mr-2" />
//                   Custom reporting
//                 </li>
//                 <li className="flex items-center text-gray-600">
//                   <Check className="w-4 h-4 text-emerald-500 mr-2" />
//                   Predictive insights
//                 </li>
//               </ul>
//             </div>

//             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300">
//               <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
//                 <Users className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">Team Management</h3>
//               <p className="text-gray-600 mb-6">
//                 Collaborate seamlessly with role-based access controls, approval workflows,
//                 and comprehensive audit trails.
//               </p>
//               <ul className="space-y-2">
//                 <li className="flex items-center text-gray-600">
//                   <Check className="w-4 h-4 text-emerald-500 mr-2" />
//                   Role-based permissions
//                 </li>
//                 <li className="flex items-center text-gray-600">
//                   <Check className="w-4 h-4 text-emerald-500 mr-2" />
//                   Approval workflows
//                 </li>
//                 <li className="flex items-center text-gray-600">
//                   <Check className="w-4 h-4 text-emerald-500 mr-2" />
//                   Complete audit trails
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Trusted by Finance Leaders
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               See how companies are transforming their financial operations with FinanceFlow
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {testimonials.map((testimonial, index) => (
//               <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300">
//                 <div className="flex items-center mb-4">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                   ))}
//                 </div>
//                 <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
//                 <div className="flex items-center">
//                   <img
//                     src={testimonial.image}
//                     alt={testimonial.name}
//                     className="w-12 h-12 rounded-full mr-4 object-cover"
//                   />
//                   <div>
//                     <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
//                     <p className="text-sm text-gray-500">{testimonial.role} at {testimonial.company}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Security Section */}
//       <section id="security" className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Enterprise-Grade Security
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Your financial data is protected by the highest security standards in the industry
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
//                 <Shield className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">256-bit SSL</h3>
//               <p className="text-gray-600">Bank-level encryption for all data transmission</p>
//             </div>

//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
//                 <Lock className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">SOC 2 Type II</h3>
//               <p className="text-gray-600">Independently audited security controls</p>
//             </div>

//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
//                 <Globe className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">PCI DSS</h3>
//               <p className="text-gray-600">Compliant payment card data handling</p>
//             </div>

//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
//                 <Zap className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">99.9% Uptime</h3>
//               <p className="text-gray-600">Guaranteed availability with redundant systems</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Pricing Section */}
//       <section id="pricing" className="py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Transparent Pricing
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Choose the plan that scales with your business. No hidden fees, no surprises.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {pricingPlans.map((plan, index) => (
//               <div key={index} className={`bg-white p-8 rounded-xl shadow-sm border-2 hover:shadow-lg transition-all duration-300 ${plan.popular ? 'border-emerald-500 relative scale-105' : 'border-gray-200'
//                 }`}>
//                 {plan.popular && (
//                   <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
//                     <span className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
//                       Most Popular
//                     </span>
//                   </div>
//                 )}
//                 <div className="text-center mb-6">
//                   <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
//                   <div className="mb-4">
//                     <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
//                     <span className="text-gray-600 ml-2">{plan.period}</span>
//                   </div>
//                 </div>
//                 <ul className="space-y-3 mb-8">
//                   {plan.features.map((feature, featureIndex) => (
//                     <li key={featureIndex} className="flex items-center">
//                       <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
//                       <span className="text-gray-600">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//                 <button className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${plan.popular
//                   ? 'bg-gradient-to-r from-emerald-500 to-blue-600 text-white hover:from-emerald-600 hover:to-blue-700 transform hover:scale-105'
//                   : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
//                   }`}>
//                   Get Started
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section id="contact" className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Ready to Get Started?
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Contact our team to learn how FinanceFlow can transform your financial operations
//             </p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             <div>
//               <form className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
//                       First Name
//                     </label>
//                     <input
//                       type="text"
//                       id="firstName"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
//                       placeholder="John"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
//                       Last Name
//                     </label>
//                     <input
//                       type="text"
//                       id="lastName"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
//                       placeholder="Doe"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                     Business Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
//                     placeholder="john@company.com"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
//                     Company
//                   </label>
//                   <input
//                     type="text"
//                     id="company"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
//                     placeholder="Your Company"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
//                     Message
//                   </label>
//                   <textarea
//                     id="message"
//                     rows={4}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
//                     placeholder="Tell us about your financial needs..."
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
//                 >
//                   Send Message
//                 </button>
//               </form>
//             </div>

//             <div className="space-y-8">
//               <div className="flex items-center">
//                 <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
//                   <Mail className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">Email</h3>
//                   <p className="text-gray-600">sales@financeflow.com</p>
//                 </div>
//               </div>

//               <div className="flex items-center">
//                 <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
//                   <Phone className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
//                   <p className="text-gray-600">+1 (555) 123-FLOW</p>
//                 </div>
//               </div>

//               <div className="flex items-center">
//                 <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
//                   <MapPin className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">Headquarters</h3>
//                   <p className="text-gray-600">100 Financial District<br />New York, NY 10005</p>
//                 </div>
//               </div>

//               <div className="bg-emerald-50 p-6 rounded-lg">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">Schedule a Demo</h3>
//                 <p className="text-gray-600 mb-4">
//                   See FinanceFlow in action with a personalized demo tailored to your business needs.
//                 </p>
//                 <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors">
//                   Book Demo
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Newsletter Section */}
//       <section className="py-16 bg-gradient-to-r from-emerald-500 to-blue-600">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h2 className="text-3xl font-bold text-white mb-4">
//               Stay Ahead of Financial Innovation
//             </h2>
//             <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
//               Get the latest fintech insights, product updates, and industry trends delivered to your inbox.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-500"
//               />
//               <button className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
//                 Subscribe
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
//             <div className="md:col-span-2">
//               <div className="flex items-center mb-4">
//                 <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
//                   <DollarSign className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="ml-2 text-xl font-bold">FinanceFlow</span>
//               </div>
//               <p className="text-gray-400 mb-4 max-w-md">
//                 Empowering businesses with next-generation financial technology.
//                 Secure, scalable, and built for the future of finance.
//               </p>
//               <div className="flex space-x-4">
//                 <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                   <Twitter className="w-5 h-5" />
//                 </a>
//                 <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                   <Linkedin className="w-5 h-5" />
//                 </a>
//                 <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                   <Github className="w-5 h-5" />
//                 </a>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold mb-4">Product</h3>
//               <ul className="space-y-2">
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold mb-4">Company</h3>
//               <ul className="space-y-2">
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold mb-4">Resources</h3>
//               <ul className="space-y-2">
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Compliance</a></li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
//             <p className="text-gray-400 mb-4 md:mb-0">
//               © 2025 FinanceFlow. All rights reserved.
//             </p>
//             <div className="flex space-x-6 text-sm">
//               <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }


