const menus = {
    main: `
      currency [command] <options>
  
      Stock exchange .............. show stock exchange for today
      Africa stock exchange ........... show africa stock exchange
      version ............ show package version
      help ............... show help menu for a command`,
  
    today: `
      currency today <options>
  
      --location, -l ..... the location to use`,
  }
  
  module.exports = (args) => {
    const subCmd = args._[0] === 'help'
      ? args._[1]
      : args._[0]
  
    console.log(menus[subCmd] || menus.main)
  }