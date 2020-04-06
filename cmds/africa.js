const ora = require('ora')
const getexchange = require('../APIs/exchange')

module.exports = async (args) => {
  const spinner = ora().start()

  try {
    const location = args.location || args.l
    const exchanger = await getexchange(location)

    spinner.stop()

    console.log(`Stock exchange for ${location}:`)
    stock.exchange.forEach(item =>
      console.log(`\t${item.date} - Low: ${item.low}° | High: ${item.high}° | ${item.text}`))
  } catch (err) {
    spinner.stop()

    console.error(err)
  }
}