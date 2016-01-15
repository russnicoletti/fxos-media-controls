mkdir -p examples/simple/node_modules/fxos-component
mkdir -p examples/simple/node_modules/fxos-icons/fonts
mkdir -p examples/simple/node_modules/fxos-theme/lib
pushd examples/simple/node_modules/fxos-component
ln -s ../../../../node_modules/fxos-component/fxos-component.js fxos-component.js
cd ../fxos-theme
ln -s ../../../../node_modules/fxos-theme/fxos-theme.css fxos-theme.css
cd lib
ln -s ../../../../../node_modules/fxos-theme/lib/fxos-theme-selector.js fxos-theme-selector.js
cd -
cd ../fxos-icons
ln -s ../../../../node_modules/fxos-icons/fxos-icons.css fxos-icons.css
cd fonts
ln -s ../../../../../node_modules/fxos-icons/fonts/fxos-icons.ttf fxos-icons.ttf
popd
