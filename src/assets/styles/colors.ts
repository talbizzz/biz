export const primary = '#fccda1'
export const background = '#125c3b'
export const backgroundLight = '#dfe6da'
export const white = '#fff'
export const black = '#000'

export function getColorWithOpacity(color: string, opacity: number): string {
  const hex = color.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}
