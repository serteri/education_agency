import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-sand-light/50">
            <SignUp routing="path" path="/en/sign-up" />
        </div>
    );
}
