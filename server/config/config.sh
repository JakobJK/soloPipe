#!/usr/bin/env bash

echo "Configuring database"

export PGPASSWORD='1234'

dropdb -U $USER solopipe_db
createdb -U $USER solopipe_db;
psql -U $USER solopipe_db < ./server/config/db_setup.sql
node ./server/config/seed.js
echo "Database configuration finished";