import { POST as createApplication } from "@/app/api/applications/route";

export async function POST(request) {
  return createApplication(request);
}
