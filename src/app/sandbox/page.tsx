import { db } from "~/server/db";
import { mockFolders, mockFiles } from "~/lib/mock-data";
import { folders, files } from "~/server/db/schema";

export default function SandboxPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-3xl">
      <form
        action={async () => {
          "use server";

          const folderInserts = await db.insert(folders).values(
            mockFolders.map((folder, index) => ({
              id: index + 1,
              name: folder.name,
              parent: index !== 0 ? 1 : null,
            })),
          );

          const fileInserts = await db.insert(files).values(
            mockFiles.map((file, index) => ({
              id: index + 1,
              name: file.name,
              size: 50000,
              url: file.url,
              parent: (index % 30) + 1,
            })),
          );

          console.log({ folderInserts, fileInserts });
        }}
      >
        <button
          type="submit"
          className="cursor-pointer rounded bg-white/50 p-3"
        >
          Seed Button
        </button>
      </form>
    </div>
  );
}
