import { FaRegCopy } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function CopyButton({ text }: { text: string }) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <Button
      onClick={handleCopy}
      variant="ghost"
      size="icon"
      className="text-gray-600 dark:text-gray-300 cursor-pointer"
    >
      <FaRegCopy size={12} className="w-4 h-4" />
    </Button>
  );
}
