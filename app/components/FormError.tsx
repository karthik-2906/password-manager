import { IoAlertCircleOutline } from "react-icons/io5";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type FormErrorProps = {
    name?: boolean;
    username?: boolean;
    password?: boolean;
};

export default function FormError({ name, username, password }: FormErrorProps) {
    return (
        <Alert variant="destructive">
            <IoAlertCircleOutline />
            <AlertTitle>Missing Information</AlertTitle>
            <AlertDescription>
                <p>Please fill out the following required fields:</p>
                <ul className="list-inside list-disc text-sm">
                    {name && <li>Website or Label</li>}
                    {username && <li>Username or Email</li>}
                    {password && <li>Password</li>}
                </ul>
            </AlertDescription>
        </Alert>
    );
}
