/**
 *
 * @param { number } number
 *
 * @returns string
 */

const numberWithCommas = (number) => {
  if (typeof number === 'number') {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } else {
    throw new Error('The input must be number！')
  }
}

export default numberWithCommas
