function isInternalLink(url: string) {
  const prefixes = ["/", "#"]
  return prefixes.some((prefix) => url.startsWith(prefix))
}

export { isInternalLink }
