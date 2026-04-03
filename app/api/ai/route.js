export async function POST(req) {
  try {
    const { content } = await req.json();

    // 🧠 Mock AI logic
    const improved = content
      ? content.charAt(0).toUpperCase() +
        content.slice(1) +
        " ✨ (Improved by AI)"
      : "Please write something first";

    return Response.json({ result: improved });

  } catch (error) {
    return Response.json({ error: "AI failed" });
  }
}