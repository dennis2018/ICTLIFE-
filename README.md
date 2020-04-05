
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
