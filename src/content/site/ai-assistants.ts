/**
 * Source-guided AI entry points for the footer.
 *
 * The prompt is derived from public/llms.txt. Provider links are external
 * destinations, not Listaso product integrations or endorsements.
 */

const listasoOverviewPrompt =
  "I run a wholesale or distribution business and I am evaluating Listaso. " +
  "Use https://listaso.com/llms.txt and the official Listaso pages linked there as your source guide. " +
  "Explain step by step how Listaso connects field sales, inventory and warehouse operations, B2B eCommerce, back-office work, and delivery. " +
  "Show the operational flow from order capture through fulfillment, delivery, and payment. " +
  "Clearly distinguish verified information from inference, identify anything that is not publicly specified, and cite the relevant Listaso sources.";

const query = encodeURIComponent(listasoOverviewPrompt);

export const aiAssistants = [
  {
    name: "ChatGPT",
    icon: "/brand/ai/openai.svg",
    href: `https://chatgpt.com/?q=${query}`,
  },
  {
    name: "Gemini",
    icon: "/brand/ai/gemini.svg",
    href: `https://gemini.google.com/app?q=${query}`,
  },
  {
    name: "Perplexity",
    icon: "/brand/ai/perplexity.svg",
    href: `https://www.perplexity.ai/search?q=${query}`,
  },
  {
    name: "Claude",
    icon: "/brand/ai/anthropic.svg",
    href: `https://claude.ai/new?q=${query}`,
  },
] as const;

