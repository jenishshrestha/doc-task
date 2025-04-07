import sections from "@/data/sections.json";

export async function GET() {
  return new Response(JSON.stringify(sections), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
