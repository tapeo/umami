/* eslint-disable no-console */
require('dotenv').config();
const fse = require('fs-extra');
const path = require('path');
const del = require('del');

function getDatabaseType(url = process.env.DATABASE_URL) {
  const type = process.env.DATABASE_TYPE || (url && url.split(':')[0]);

  console.log(`Database type: ${type}`);
  

  if (type === 'postgres') {
    return 'postgresql';
  }

  return type;
}

const databaseType = getDatabaseType();

console.log(`Selected database type: ${databaseType}`);


if (!databaseType || !['mysql', 'postgresql'].includes(databaseType)) {
  throw new Error('Missing or invalid database');
}

console.log(`Database type detected: ${databaseType}`);

const src = path.resolve(__dirname, `../db/${databaseType}`);
const dest = path.resolve(__dirname, '../prisma');

del.sync(dest);

fse.copySync(src, dest);

console.log(`Copied ${src} to ${dest}`);
