export async function HelpAddToClient() {
  const instructions = await fetch(
    "https://raw.githubusercontent.com/datastax/astra-db-mcp/refs/heads/main/README.md"
  ).then((res) => res.text());

  return {
    success: true,
    instructions,
  };
}
