export const DateFormat = (value: string) => {
  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const dd = String(today.getDate()).padStart(2, '0')

  let fullDateStr = `${yyyy}-${mm}-${dd}T${value}`

  if (/([+-]\d{2})$/.test(fullDateStr)) {
    fullDateStr += ':00'
  }

  const date = new Date(fullDateStr)

  if (isNaN(date.getTime())) {
    console.warn('Invalid date:', fullDateStr)
    return 'Invalid Date'
  }

  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
}
