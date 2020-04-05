
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
