const transpose = (array: Array<Array<any>>) =>  {
  return array[0].map((_, colIndex) => array.map(row => row[colIndex]))
}

export {
  transpose
}