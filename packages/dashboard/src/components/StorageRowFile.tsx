import { TableCell, TableRow } from "@/components/ui/table";
import { tsr } from "@/tsr";
import { useState } from "react";
import { Loader } from "./Loader";
import { Button } from "@/components/ui/button";
import SquareArrowOutUpRight from "lucide-react/icons/square-arrow-out-up-right";
import { getSizeStr } from "@/lib/helpers";
import type { FolderContentDto, FileDto } from "@/tsr";

type StorageRowFileProps = {
  name: string;
  content: Extract<FolderContentDto, { type: "file" }>;
  setFile(file: FileDto): void;
};

export function StorageRowFile({
  name,
  content,
  setFile,
}: StorageRowFileProps) {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    try {
      const response = await tsr.getStorageFile.query({
        query: { path: content.path },
      });
      if (response.status === 200) {
        setFile(response.body);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <TableRow>
      <TableCell></TableCell>
      <TableCell className="flex gap-2 items-center">
        {name}
        {content.canPreview ? (
          <Button
            size="icon"
            disabled={loading}
            variant="secondary"
            onClick={onClick}
            className="w-5 h-5 p-0"
          >
            {loading ? (
              <Loader className="w-4 h-4" />
            ) : (
              <SquareArrowOutUpRight className="w-3 h-3" />
            )}
          </Button>
        ) : null}
      </TableCell>
      <TableCell>{getSizeStr(content.size)}</TableCell>
    </TableRow>
  );
}