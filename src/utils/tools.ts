export const getNow = () => {
  const nowDate = new Date()
  return [nowDate.getFullYear(), nowDate.getMonth() + 1, nowDate.getDate()]
}
