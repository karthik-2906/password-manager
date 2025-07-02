import { RiLoader4Fill } from "react-icons/ri";

export default function Loading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black z-50">
            <RiLoader4Fill
                className="animate-spin text-gray-600 dark:text-gray-300"
                size={32}
            />
        </div>
    );
}
