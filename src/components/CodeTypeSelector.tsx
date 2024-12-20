import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const CODE_TYPES = {
  code: "Directly run code like uint x = 1;",
  toplevelcode:
    "define global variables and functions",
  globalcode:
    "add external libraries import or interface definitions",
} as const;

type CodeType = keyof typeof CODE_TYPES;

interface CodeTypeSelectorProps {
  value: CodeType;
  onChange: (type: CodeType) => void;
}

export function CodeTypeSelector({ value, onChange }: CodeTypeSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex rounded-lg overflow-hidden border border-neutral-800 bg-neutral-900/50 shadow-[0_0_15px_rgba(59,130,246,0.05)]">
        {(Object.entries(CODE_TYPES) as [CodeType, string][]).map(
          ([type, description]) => (
            <div key={type} className="relative">
              <motion.button
                onClick={() => onChange(type)}
                className={cn(
                  "px-4 py-1.5 text-sm transition-all duration-300 relative",
                  "hover:bg-neutral-800/50",
                  "border-r border-neutral-800 last:border-r-0",
                  value === type
                    ? "text-blue-400"
                    : "text-neutral-400 hover:text-neutral-200",
                  "flex items-center gap-2"
                )}
              >
                <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                        <HelpCircle className="w-3 h-3" />
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="max-w-xs bg-neutral-900 border-neutral-800/50 shadow-[0_0_15px_rgba(0,0,0,0.3)]"
                    >
                      <p className="text-sm">{description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
