
import { FaHome, FaUserCircle, FaEnvelope } from "react-icons/fa";
import { FiSettings, FiLogOut, FiFileText } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import { TiUserAdd } from "react-icons/ti";
import { FaUsers } from "react-icons/fa";
import { HiOutlineViewGrid } from "react-icons/hi";
import { MdWorkOutline } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineRecommend } from "react-icons/md";
import { BsBank2 } from "react-icons/bs";
// import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import { FaShieldAlt } from "react-icons/fa";
import { FaFileUpload } from "react-icons/fa";
// 
// import DashboardIcon from '@mui/icons-material/Dashboard';
import { MdDashboard } from "react-icons/md";
import { CiBank } from "react-icons/ci";
import { BiCategory } from "react-icons/bi"; // Add category icon

export const sidebarItems = [
    {
        label: "Dashboard",
        path: "/",
        icon: MdDashboard,
        description: "Dashboard page",
    },
    {
        label: "Users",
        path: "/users",
        icon: FaUsers,
        description: "User dashboard with summary and insights",
    },
    {
        label: "Create User",
        path: "/createuser",
        icon: TiUserAdd,
        description: "Track job or internship applications",
    },
    {
        label: "Model Basket",
        path: "/baskets",
        icon: MdOutlineRecommend,
        description: "For employers to post new jobs or internships",
    },
    {
        label: "Categories",
        path: "/categories",
        icon: BiCategory,
        description: "Manage categories and assignments for financial instruments",
    },
    {
        label: "KYC Verification",
        path: "/kycverify",
        icon: BsBank2,
        description: "Account and app preferences",
    },
    {
        label: "Risk Profiling",
        path: "/riskprofile",
        icon: FaShieldAlt,
        description: "Risk Profiling",
    },
    {
        label: "Portfolio Upload",
        path: "/upload-portfolio",
        icon: FaFileUpload,
        description: "Upload user's portfolio file",
    },
    {
        label: "Recommendations",
        path: "/recommendations",
        icon: MdOutlineRecommend,
        description: "Fund or asset recommendations based on risk profile",
    },
    {
        label: "Benchmarks",                     
        path: "/benchmarks",
        icon: HiOutlineViewGrid,
        description: "Benchmark portfolio performance with indices",
    }
];

// try {
//     isLoading = true;
//     if(searchTerm.length>0){

//     }
//     const res = await fetch(`${backend_url}/api/v1/users/get-all-users?search=${searchTerm}&page=${currentPage}&limit=${limit}`, {
//         method: 'GET',
//         headers: {
//             Authorization: `Bearer ${token}`
//         },
//         // cache: 'no-store',
//         credentials: 'include'
//     });


//     const data = await res.json();
//     if (data.success) {
//         users = data.users;
//         totalPages = data.totalPages;
//         stats = {
//             totalUsers: data.totalUsers,
//             totalActiveUsers: data.totalActiveUsers,
//             totalSuspendedUsers: data.totalSuspendedUsers,
//             totalKycPendingUsers: data.totalKycPendingUsers
//         };
//         // currentPage = data.currentPage
//     } else {
//         error = data.message || 'Failed to fetch users';
//     }
// } catch (err) {
//     console.error('Failed to fetch users:', err);
//     error = 'Failed to connect to server';
// } finally {
//     isLoading = false;
// }

//try of users page.js