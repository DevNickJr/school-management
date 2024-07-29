
export const formatAmount = (amount: string) => {
    let count = 1
    let last = ''
    for (let i=amount.length-1; i>=0; i--) {
      if (count % 3 === 0) {
        last =  amount[i] + last
        if ((i-1) >= 0) {
          last = ',' + last
        }
        count = 1
        continue
      }
      last =  amount[i] + last
      count++
    }
    return last
  }