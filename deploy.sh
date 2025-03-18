SRC=./backend/dist
DST=/var/www/test-metrics

echo "Starting deploy"
echo "Removing binaries in $DST"
rm -rf $DST/*

echo "Copying binaries from $SRC"
rsync -av -q $SRC/ $DST/
mv $DST/.env.prod $DST/.env

cd $DST
echo "INSTALLING node_modules"
npm install --omit=dev
chown -R www-data:www-data $DST/*

echo "Finished"