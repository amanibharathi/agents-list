export const capitalizeFirstLetter = (word: any) => {
  if (!word) return ''
  const capitalizedWord = word.charAt(0).toUpperCase() + word.substring(1)
  return capitalizedWord.replaceAll('_', ' ')
}

export const replaceUnderscoreWithSpace = (word: any) => {
  if (!word) return ''
  const result = word.replaceAll('_', ' ')
  return capitalizeFirstLetter(result)
}
