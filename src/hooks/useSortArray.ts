export const useSortArray = () => {
  const sort = (array: Record<string, any>[], dayKey: string) => {
    const newArray = array.sort((a, b) => {
      // a.payday と b.payday を比較
      if (a[dayKey] < b[dayKey]) {
        return -1 // a を b の前に配置
      } else if (a[dayKey] > b[dayKey]) {
        return 1 // a を b の後に配置
      } else {
        return 0 // 順序を変更しない
      }
    })

    return newArray
  }
  return {
    sort
  }
}
