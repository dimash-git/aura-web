export const saveFile = (url: string, filename: string): void => {
  fetch(url).then((response) => response.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.setAttribute('href', url)
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    })
}

export const buildFilename = (prefix: string): string => {
  const date = new Date().toISOString().slice(0, 10)
  return `${prefix}-${date}.jpg`
}
