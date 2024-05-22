import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import User from "./pages/User";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import Tasker from "./pages/Tasker";
import TaskerLogin from "./pages/TaskerLogin";
import TaskerSignup from "./pages/TaskerSignup";
import UserDashboard from "./pages/UserDashboard";
import TaskerDashboard from "./pages/TaskerDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";
import { Navigate } from "react-router-dom";
import BookTask from "./pages/BookTask";
import TaskerDescription from "./pages/TaskerDescription";
import TaskerRecommendation from "./pages/TaskerRecommendation";
import MyServices from "./pages/MyServices";
import AddService from "./pages/AddService";
import UserProfile from "./pages/UserProfile";
import UserEdit from "./pages/UserEdit";
import EditService from "./pages/EditService";
import TaskerProfile from "./pages/TaskerProfile";
import TaskerEdit from "./pages/TaskerEdit";
import Success from "./pages/Success";
import TaskDetail from "./pages/TaskDetail";
import Review from "./pages/Review";
import UserReviews from "./pages/UserReviews";

function App() {
    const cookies = useCookies([]);
    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage />,
        },
        {
            path: "/user",
            element: <User />,
        },
        {
            path: "/user/login",
            element: <UserLogin />,
        },
        {
            path: "/user/signup",
            element: <UserSignup />,
        },
        {
            path: "/tasker",
            element: <Tasker />,
        },
        {
            path: "/tasker/login",
            element: <TaskerLogin />,
        },
        {
            path: "/tasker/signup",
            element: <TaskerSignup />,
        },
        {
            path: "/users/dashboard",
            element: cookies[0].token ? (
                <UserDashboard />
            ) : (
                <Navigate to="/user/login" />
            ),
        },
        {
            path: "/users/booktask",
            element: cookies[0].token ? (
                <BookTask />
            ) : (
                <Navigate to="/user/login" />
            ),
        },
        {
            path: "/users/booktask/recommendation",
            element: cookies[0].token ? (
                <TaskerRecommendation />
            ) : (
                <Navigate to="/user/login" />
            ),
        },
        {
            path: "/users/taskerprofile/:id",
            element: cookies[0].token ? (
                <TaskerDescription />
            ) : (
                <Navigate to="/user/login" />
            ),
        },
        {
            path: "/users/userprofile/:id",
            element: cookies[0].token ? (
                <UserProfile />
            ) : (
                <Navigate to="/user/login" />
            ),
        },
        {
            path: "/users/userprofile/edit/:id",
            element: cookies[0].token ? (
                <UserEdit />
            ) : (
                <Navigate to="/user/login" />
            ),
        },
        {
            path: "/users/review",
            element: cookies[0].token ? (
                <Review />
            ) : (
                <Navigate to="/user/login" />
            ),
        },
        {
            path: "/users/userreviews",
            element: cookies[0].token ? (
                <UserReviews />
            ) : (
                <Navigate to="/user/login" />
            ),
        },
        {
            path: "/taskers/dashboard",
            element: cookies[0].token ? (
                <TaskerDashboard />
            ) : (
                <Navigate to="/tasker/login" />
            ),
        },
        {
            path: "/taskers/taskdetail",
            element: cookies[0].token ? (
                <TaskDetail />
            ) : (
                <Navigate to="/tasker/login" />
            ),
        },
        {
            path: "/taskers/addservice",
            element: cookies[0].token ? (
                <AddService />
            ) : (
                <Navigate to="/tasker/login" />
            ),
        },
        {
            path: "/taskers/myservices/:id",
            element: cookies[0].token ? (
                <MyServices />
            ) : (
                <Navigate to="/tasker/login" />
            ),
        },
        {
            path: "/taskers/myservices/edit/:id",
            element: cookies[0].token ? (
                <EditService />
            ) : (
                <Navigate to="/tasker/login" />
            ),
        },
        {
            path: "/taskers/taskerprofile/:id",
            element: cookies[0].token ? (
                <TaskerProfile />
            ) : (
                <Navigate to="/tasker/login" />
            ),
        },
        {
            path: "/taskers/taskerprofile/edit/:id",
            element: cookies[0].token ? (
                <TaskerEdit />
            ) : (
                <Navigate to="/tasker/login" />
            ),
        },
        {
            path: "/forget-password",
            element: <ForgetPassword />,
        },
        {
            path: "/reset-password/:token",
            element: <ResetPassword />,
        },
        {
            path: "/services",
            element: <Services />,
        },
        {
            path: "/success",
            element: <Success />,
        },
        {
            path: "*",
            element: <NotFound />,
        },
    ]);
    return (
        <>
            <RouterProvider router={router} />;
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default App;
