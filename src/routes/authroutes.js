import Login from '../pages/auth/login'; 
import Recoverpwd from '../pages/auth/recover-pwd'; 

var authRoutes = [
    { path: '/authentication/login', name: 'Login', icon: 'mdi mdi-account-key', component: Login }, 
    { path: '/authentication/recover-pwd', name: 'Recover Password', icon: 'mdi mdi-account-convert', component: Recoverpwd }, 
];
export default authRoutes; 