import { exec } from "child_process";
import { platform } from "os";

export async function OpenBrowser(params: { url: string }) {
  const { url } = params;
  const command =
    platform() === "darwin"
      ? "open"
      : platform() === "win32"
      ? "start"
      : "xdg-open";

  return new Promise<{ success: boolean; message: string }>(
    (resolve, reject) => {
      exec(`${command} ${url}`, (error) => {
        if (error) {
          resolve({
            success: false,
            message: `Failed to open browser: ${error.message}`,
          });
        } else {
          resolve({
            success: true,
            message: `Successfully opened ${url} in default browser`,
          });
        }
      });
    }
  );
}
