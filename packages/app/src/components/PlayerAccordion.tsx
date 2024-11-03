import copy from "copy-to-clipboard";
import type { SelectObjectItem } from "@/components/SelectObject";
import type { Lang, Metadata } from "@superstreamer/player/react";
import { PlayerMetadataForm } from "@/components/PlayerMetadataForm";
import { SelectObject } from "@/components/SelectObject";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PlayerAccordionProps {
  masterUrl?: string;
  metadata: Metadata;
  setMetadata(metadata: Metadata): void;
  lang: Lang;
  setLang(lang: Lang): void;
}

export function PlayerAccordion({
  masterUrl,
  metadata,
  setMetadata,
  lang,
  setLang,
}: PlayerAccordionProps) {
  const { toast } = useToast();

  const languages: SelectObjectItem<string>[] = [
    { value: "nld", label: "Nederlands" },
    { value: "eng", label: "English" },
  ];

  return (
    <Accordion type="single" collapsible defaultValue="session">
      <AccordionItem value="session">
        <AccordionTrigger className="px-2">Session</AccordionTrigger>
        <AccordionContent>
          <div className="px-4">
            <Label>Master playlist URL</Label>
            <div className="mt-2 flex gap-2">
              <Input
                className="text-muted-foreground"
                value={masterUrl ?? ""}
                onClick={(event) => {
                  (event.target as HTMLInputElement).select();
                }}
                readOnly
              />
              <Button
                disabled={!masterUrl}
                variant="secondary"
                onClick={() => {
                  if (masterUrl) {
                    copy(masterUrl);
                    toast({
                      description: "Copied playlist URL to clipboard",
                    });
                  }
                }}
              >
                Copy
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="settings">
        <AccordionTrigger className="px-2">Settings</AccordionTrigger>
        <AccordionContent className="space-y-4">
          <div className="px-4 rounded-md space-y-2">
            <Label>Language</Label>
            <SelectObject
              className="w-full max-w-full"
              items={languages}
              value={lang}
              onChange={(lang) => setLang(lang as Lang)}
            />
            <p className="text-sm text-muted-foreground">
              ISO 6301 - 3 characters
            </p>
          </div>
          <p className="ml-2">
            Influences the{" "}
            <span className="font-mono text-xs text-gray-600 bg-gray-50 rounded-sm p-1">
              metadata
            </span>{" "}
            object to the{" "}
            <span className="font-mono text-xs text-red-600 bg-red-50 rounded-sm p-1">
              Controls
            </span>{" "}
            component.
          </p>
          <div className="px-4 rounded-md">
            <PlayerMetadataForm values={metadata} onSubmit={setMetadata} />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
