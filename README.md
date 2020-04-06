
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
