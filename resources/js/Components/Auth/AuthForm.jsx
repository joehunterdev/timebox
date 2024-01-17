import React from "react";
import {
    Form,
    Link,
    useSearchParams,
    useNavigate,
    useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { authActions } from "../../store/auth-slice";
import { login } from "../../store/auth-actions";

function AuthForm() {
    const dispatch = useDispatch();

    const data = useSelector((state) => state.auth);
    const location = useLocation();
    const navigate = useNavigate();
    debugger;
    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get("mode") === "login";
    const isSubmitting = location.state === "submitting";

    useEffect(() => {
        console.log("data " + data);
       // navigate("/");
    }, [data, dispatch]);

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         await dispatch(login({ email, password }));
    //         navigate("/"); // change this to the path you want to redirect to
    //     } catch (error) {
    //         console.error('Login failed:', error);
    //     }
    // };
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(login({ email, password }));
        console.log("submiting");
    };
    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="authForm form-control form-inline body-bg opacity-75 h-100 border-0"
            >
                <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
                {data && data.errors && (
                    <ul>
                        {Object.values(data.errors).map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                )}

                {data && data.message && <p>{data.message} </p>}
                <p>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" required />
                </p>
                <p>
                    <label htmlFor="image">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        required
                    />
                </p>
                <div className="login">
                    <Link
                        to={`?mode=${isLogin ? "register" : "login"}`}
                        type="button"
                    >
                        {isLogin ? "Create new user" : "Login"}
                    </Link>
                    <button disabled={isSubmitting}>
                        {isSubmitting ? "Submitting.." : "Save"}
                    </button>
                </div>
            </form>
        </>
    );
}

export default AuthForm;
