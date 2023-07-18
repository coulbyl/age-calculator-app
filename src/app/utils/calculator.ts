export function calculateAge(birthDate: Date): Age {
  const today = new Date()
  let years = today.getFullYear() - birthDate.getFullYear()
  let months = today.getMonth() - birthDate.getMonth()
  let days = today.getDate() - birthDate.getDate()

  if (
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate())
  ) {
    years--
    months += 12
  }

  if (days < 0) {
    months--
    const previousMonthDate = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      birthDate.getDate()
    )
    days = Math.floor(
      (today.getTime() - previousMonthDate.getTime()) / (1000 * 60 * 60 * 24)
    )
  }

  return { years, months, days }
}

export interface Age {
  years: number
  months: number
  days: number
}
