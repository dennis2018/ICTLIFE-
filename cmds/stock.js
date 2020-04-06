const ora = require('ora')
const getStock = require('../APIs/exchange.js')

module.exports = async (args) => {
  const spinner = ora().start()

  try {
    const location = args.location || args.l
    const exchange = await getexchange(location)

    spinner.stop()

    console.log(`Current conditions in ${location}:`)
    console.log(`\t${exchange.condition.temp}° ${stock.condition.text}`)
  } catch (err) {
    spinner.stop()

    console.error(err)
  }
}