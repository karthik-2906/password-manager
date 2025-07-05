import { Input } from "@/components/ui/input";

export function Search({
    isSaveDisabled,
    value,
    onChange
}: {
    isSaveDisabled: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <Input
            type="text"
            placeholder="Search"
            value={value}
            onChange={onChange}
            className="w-full text-sm"
            disabled={isSaveDisabled}
        />
    );
}