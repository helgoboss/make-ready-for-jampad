#!/usr/bin/env node

require('shelljs/global')
const path = require('path')

const files = process.argv[2] || '*'
ls(files).forEach(f => {
    const fileNameWithoutExtension = path.parse(f).name
    exec(`lame --preset insane --tt "${fileNameWithoutExtension}" "${f}"`)
    exec(`mp3gain -r -c "${fileNameWithoutExtension}.mp3"`)
})