import { headers } from "next/headers";
import ClientPage from "./client-page";

// Force dynamic rendering so that the middleware runs on every request
export const dynamic = "force-dynamic";

export default async function Page() {
  const headersList = await headers();
  const token = headersList.get("x-video-token") || "";

  return <ClientPage serverToken={token} />;
}
