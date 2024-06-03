const formatDate = (value: string) => {
  const date = new Date(value) // Parse the string into a Date objec
  const formatDate = date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const newDateFormat = formatDate.split('/')
  
return `${newDateFormat[0]}.${newDateFormat[1]}.${newDateFormat[2]}`;
}

function formatTime(date: Date) {
  const d = new Date(date),
    hour = '' + (d.getHours()),
    minute = '' + d.getMinutes()

  return [hour, minute].join('.');
}
export {
  formatDate,
  formatTime
}
