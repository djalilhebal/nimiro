echo off

echo CLEANING... 
IF EXIST webapp\module.bundle.js (del webapp\module.bundle.js)

echo BUILDING...
cd src
node builder
cd ..

echo BROWSERIFYING...
browserify -e src\index.js -s nimiro -o webapp\module.bundle.js

echo Yo!

rem TYPE worker.txt >> webapp\bundle.js

rem echo MINIFYING...
rem IF EXIST webapp\min.bundle.js (del webapp\bundle.min.js)
rem java -jar closure-compiler.jar webapp\bundle.js >> webapp\bundle.min.js


pause
