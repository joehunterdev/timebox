import React from "react";
import { json, redirect } from "react-router-dom";

import AuthForm from "./AuthForm";

function AuthenticationPage() {
    return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {

    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get("mode") || "login";
    
    const data = await request.formData();

    if (mode !== "login" && mode !== "register")
        throw new json({ message: "Invalid mode" }, { status: 422 });

    const authData = {
        email: data.get("email"),
        password: data.get("password"),
    };

    const response = await fetch("http://localhost:8080/api/" + mode, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authData),
    });
    console.log("response" + response);  
    if (response.status == 422 || response.status == 401) {
        return response;
    }

    if (!response.ok) {
        throw json(
            { message: "Could not authenticate user." },
            { status: 500 }
        );
    }
    const resData = await response.json();
    const token = resData.token;

    localStorage.setItem("token", token);
    const expiration = new Date(expiration.getHours() + 1);
    localStorage.setItem("expiration", expiration.toISOString());

    return redirect("/");
}