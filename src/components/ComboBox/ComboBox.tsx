"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/shadcn/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadcn/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { GameType } from "@/modules/Chess/Chess";

type Element = {
  value: string;
  label: string;
};
type Props = {
  elements: Element[];
  defaultLabel: string;
  searchLabel: string;
  className?: string;
  setValue?: Dispatch<SetStateAction<string>>;
};

export default function ComboBox(props: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const onSelect = (currentValue: string) => {
    const res = currentValue === value ? "" : currentValue;
    setValue(res);
    props.setValue && props.setValue(res);
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={"min-w-[200px] justify-between " + props?.className}
        >
          {value
            ? props.elements.find((element) => element.value === value)?.label
            : props.defaultLabel}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={"min-w-[200px] p-0 " + props?.className}>
        <Command>
          <CommandInput placeholder={props.searchLabel} />
          <CommandList>
            <CommandEmpty>No element found.</CommandEmpty>
            <CommandGroup>
              {props.elements.map((element) => (
                <CommandItem
                  key={element.value}
                  value={element.value}
                  onSelect={onSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === element.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {element.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
