export const convertDateFormat = (originalDate: any) => {
  if (!originalDate) {
    return null
  }
  // Splitting the date and time part
  const parts = originalDate.split('T')

  // Extracting the date part
  const datePart = parts[0]

  // Creating a Date object from the date part
  const dateObj = new Date(datePart)

  // Array of months to convert month number to month name
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  // Extracting components from the Date object
  const year = dateObj.getFullYear()
  const monthIndex = dateObj.getMonth()
  const day = dateObj.getDate()

  // Formatted date string
  const formattedDate = `${months[monthIndex]} ${day}, ${year}`

  return formattedDate
}
