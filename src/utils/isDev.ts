/**
Uses vite's `import.meta` to verify whether or not the server is running
in a development environment.

@returns true if this is a development environment
*/
export default function isDev(): boolean {
  return import.meta.env.MODE === "development";
}
