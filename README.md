
## Setting Up The Project
As with all Javascript projects, creating a package.json and an entry file is the best way to kick things off. We can keep it simple--no dependencies are needed yet.
```
mkdir ictlife
cd ictlife
npm init
```
package.json

![alt text](https://github.com/dennis2018/ICTLIFE-/blob/master/1.PNG)

index.js

![alt text](https://github.com/dennis2018/ICTLIFE-/blob/master/%232.PNG)

## Creating A Bin File
We'll need a way to invoke our newly minted app and show the welcome message, as well as add it to the system path so it can be called from anywhere. A bin file is the way to do that.
```
#!/usr/bin/env node
require('../')()
```
Next, we'll add our binary to the package.json file. This will automatically place it onto the user's system path when they install our package as a global (npm install -g currency-cli).

```
npm install -g currency-cli
```
![alt text](https://github.com/dennis2018/ICTLIFE-/blob/master/%233.PNG)

package.json

![alt text](https://github.com/dennis2018/ICTLIFE-/blob/master/1.PNG)

We can now call our bin file directly by running ./bin/currency. You should see the welcome message. Running npm link in the root of your project will symlink your binary file to the system path, making it accessible from anywhere by running outside.

## Parsing Commands And Arguments

When you run a CLI app, it consists of arguments and commands. Arguments (or "flags") are the values prepended with one or two hyphens (such as -d, --debug or --env production) and are useful for passing options to our app. Commands are all the other values that don't have a flag. Unlike commands, arguments don't need to be specified in any particular order. For example, we could run ```currency stock today ``` and just assume that the second command will always be the Stock--but wouldn't it be better to run ```currency today --Stock Currency ```in case we want to add more options in the future?


In order for our app to be useful at all, we'll need to parse those commands ands arguments, and turn them into an object. We could always jump into ```process.argv``` and try to do it ourselves, but let's install our first dependency called ```minimist``` to take care of this one for us.

```
$ npm install --save minimist
```
![alt text](https://github.com/dennis2018/ICTLIFE-/blob/master/%234.PNG)

The reason we remove the first two arguments with .slice(2) is because the first arg will always be the interpreter followed by the name of the file being interpreted. We only care about the arguments after that.

Now running outside today should output { _: ['Stock'] }. If you run outside today --Stock "Brooklyn, NY", it should output { _: ['today'], location: 'Brooklyn, NY' }. We'll go more in-depth with arguments later when we actually use the location, but for now this is enough to set up our first command.

## Argument Syntax
To better understand how argument syntax works, you can read this. Basically, a flag can be single or double hyphened, and will take the value immediately following in the command or equal true when there is no value. Single-hyphen flags can also be combined for short-handed booleans (-a -b -c or -abc would give you { a: true, b: true, c: true }.)

It's important to remember that values must be quoted if they contain special characters or a space. Running --foo bar baz would give you `{ : ['baz'], foo: 'bar' }, but running--foo "bar baz"would give you{ foo: 'bar baz' }`._

## Running Commands
It's a good idea to split up the code for each command and only load it into memory when it is called. This creates faster startup times and prevents unnecessary modules from loading. Easy enough with a switch statement on the main command given to us by minimist. Using this setup, each command file should export a function, and in this case, we're passing the arguments to each command so we can use them later.

Now if you run currency today, you'll see the message "Stock Exchange for USD", and if you run outside stock, it will tell you that "stock" is not a valid command. Obviously we still need to query a stock exchange API to get real data, but this is a good start.

## Expected Commands
There are a few commands and arguments that are expected to be in every CLI: help, --help and -h, which should obviously show help menus, and version, --version and -v which should output the current app version. We should also default to a main help menu if no command is specified.

This can be easily implemented in our current setup by adding two cases to our switch statement, a default value for the cmd variable, and implementing some if statements for the help and version argument flags. Minimist automatically parses arguments to key/values, so running currency --version will make args.version equal true.

index.js

![alt text](https://github.com/dennis2018/ICTLIFE-/blob/master/%236.PNG)

version.js

![alt text](https://github.com/dennis2018/ICTLIFE-/blob/master/%237.PNG)

help.js

![alt text](https://github.com/dennis2018/ICTLIFE-/blob/master/%238.PNG)

Now if you run currency help stock or currency stock -h, you should see the help menu for the today command. Running outside or outside -h should show you the main help menu.

## Adding Another Command
This project setup is really awesome because if you need to add a new command, all you need to do is create a new file in the cmds folder, add it to the switch statement and add a help menu if it has one.

africa.js

![alt text](https://github.com/dennis2018/ICTLIFE-/blob/master/%239.PNG)

index.js

![alt text](https://github.com/dennis2018/ICTLIFE-/blob/master/%2310.PNG)

help.js

![alt text](https://github.com/dennis2018/ICTLIFE-/blob/master/%2311.PNG)

## Loading Indicators
Sometimes a command can take a long time to run. If you're fetching data from an API, generating content, writing files to the disk or any other process that takes more than a few milliseconds, you want to give the user some feedback that your app hasn't frozen and is simply working hard. Sometimes you can measure the progress of your operation and it makes sense to show a progress bar, but other times it's more variable and makes sense to show a loading indicator instead.

For our app, we can't measure the progress of our API requests so we'll use a basic spinner to show something is happening. Install two more dependencies for our network requests and our spinner:

```
 npm install --save axios ora
  ```
