import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-sand-light/50">
            <SignIn routing="path" path="/en/sign-in" />
        </div>
    );
}
