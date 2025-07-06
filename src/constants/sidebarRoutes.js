
import { FaHome, FaUserCircle, FaEnvelope } from "react-icons/fa";
import { FiSettings, FiLogOut, FiFileText } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import { TiUserAdd } from "react-icons/ti";
import { FaUsers } from "react-icons/fa";
import { HiOutlineViewGrid } from "react-icons/hi";
import { MdWorkOutline } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineRecommend } from "react-icons/md";
// import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import { FaShieldAlt } from "react-icons/fa";
// 
// import DashboardIcon from '@mui/icons-material/Dashboard';
import { MdDashboard } from "react-icons/md";
import { CiBank } from "react-icons/ci";
export const sidebarItems = [
    {
        label: "Dashboard",
        path: "/",
        icon: MdDashboard,
        description: "Dasboard page",
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
        label: "KYC Verification",
        path: "/kycverify",
        icon: CiBank,
        description: "Account and app preferences",
    },
    {
        label: "Risk Profiling",
        path: "/riskprofile",
        icon: FaShieldAlt,
        description: "Risk Profiling"
    }
];
