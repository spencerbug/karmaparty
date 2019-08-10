module.exports = () => {
  //get whether or not in prod or dev mode
  const env = process.env.NODE_ENV || 'development'
  return require(`./${env}.js`)
}
