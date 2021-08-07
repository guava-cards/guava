export function getNodesFromConnection<Node>(
  connection:
    | {
        edges?: ({ node?: Node | null } | undefined | null)[] | null
      }
    | undefined
    | null
): Node[] {
  const nodes = connection?.edges?.map(edge => edge?.node)
  const found = nodes?.filter(node => typeof node !== 'undefined' && node)
  return (found ?? []) as Node[]
}
