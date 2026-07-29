import { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);

  // Only run this logic if it's the thoughts page and has an ID
  if (!url.pathname.startsWith("/thoughts") || !url.searchParams.has("id")) {
    return context.next();
  }

  const id = url.searchParams.get("id");

  // Basic bot detection to avoid slowing down real users
  const userAgent = request.headers.get("user-agent")?.toLowerCase() || "";
  const isBot = /bot|facebook|linkedin|twitter|slack|whatsapp|telegram|discord/i.test(userAgent);

  if (!isBot) {
    return context.next();
  }

  try {
    // Fetch the blog post data from our serverless API
    const apiUrl = new URL(`/.netlify/functions/blog?id=${id}`, request.url);
    const apiResponse = await fetch(apiUrl.toString());

    if (!apiResponse.ok) {
      return context.next();
    }

    const post = await apiResponse.json();

    // Fetch the original HTML (index.html)
    const response = await context.next();
    let html = await response.text();

    const title = post.title ? `${post.title} | Ankit Abhishek` : "Ankit Abhishek | Data Engineer & Software Engineering";
    const description = post.description || "Ankit Abhishek — High-performance Data Engineer & Software Engineering.";
    const image = post.coverImage || "https://ankitabhishek.netlify.app/logo.jpg";
    const postUrl = request.url;

    // Replace the Open Graph tags in the HTML using regular expressions
    html = html
      .replace(/<meta property="og:title" content="[^"]*" \/>/i, `<meta property="og:title" content="${title}" />`)
      .replace(/<meta property="og:description"[\s\S]*?content="[^"]*" \/>/i, `<meta property="og:description" content="${description}" />`)
      .replace(/<meta property="og:image" content="[^"]*" \/>/i, `<meta property="og:image" content="${image}" />`)
      .replace(/<meta property="og:url" content="[^"]*" \/>/i, `<meta property="og:url" content="${postUrl}" />`)
      .replace(/<meta name="twitter:title" content="[^"]*" \/>/i, `<meta name="twitter:title" content="${title}" />`)
      .replace(/<meta name="twitter:description"[\s\S]*?content="[^"]*" \/>/i, `<meta name="twitter:description" content="${description}" />`)
      .replace(/<meta name="twitter:image" content="[^"]*" \/>/i, `<meta name="twitter:image" content="${image}" />`)
      .replace(/<title>.*?<\/title>/i, `<title>${title}</title>`)
      .replace(/<meta name="description"[\s\S]*?content="[^"]*" \/>/i, `<meta name="description" content="${description}" />`);

    return new Response(html, {
      status: 200,
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  } catch (error) {
    console.error("Edge function error:", error);
    return context.next();
  }
};
