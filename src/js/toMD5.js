import md5 from 'md5'

export default (value) => {
  let hashedValue = md5(value)
  for (let i = 0; i < 50; i++) {
    hashedValue = md5(hashedValue)
  }
  return hashedValue
}
