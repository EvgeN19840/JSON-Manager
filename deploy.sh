SRC=./backend/dist
DST=/var/www/test-metrics

echo "Starting deploy"
echo "Removing binaries in $DST"
rm -rf $DST/*

echo "Copying binaries from $SRC"
cp -R $SRC/* $DST/

chown -R www-data:www-data $DST/*
rm -rf $SRC/
echo "Finished"