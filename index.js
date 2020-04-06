const minimist = require('minimist')

module.exports = () => {
  const args = minimist(process.argv.slice(2))

  const error = require('./APIs/error')

  let cmd = args._[0] || 'help'

  if (args.version || args.v) {
    cmd = 'version'
  }

  if (args.help || args.h) {
    cmd = 'help'
  }

  switch (cmd) {
    case 'today':
      require('./cmds/stock')(args)
      break

    case 'version':
      require('./cmds/version')(args)
      break

    case 'help':
      require('./cmds/help')(args)
      break

      case 'africa':
      require('./cmds/africa')(args)
      break

    default:
      console.error(`"${cmd}" is not a valid command!`)
      break
  }
}