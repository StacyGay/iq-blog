import { ReactElement } from "react";
import { LoginSignup } from "../../components/login-signup";
import { Layout } from "../../components/layout";

export default function LoginIndex(): ReactElement {
    return (
        <Layout>
            <LoginSignup initial="login" />
        </Layout>
    )
}