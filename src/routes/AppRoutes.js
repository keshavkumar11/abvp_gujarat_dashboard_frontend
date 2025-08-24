import { Routes,Route } from "react-router-dom";
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import AdminDashboard from '../pages/AdminDashboard';


const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/admin" element={<AdminDashboard/>}/>
        </Routes>
    )
}

export default AppRoutes;