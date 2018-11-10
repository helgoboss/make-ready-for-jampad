#!/usr/bin/env node

require('shelljs/global')
const NodeID3 = require('node-id3')
const path = require('path')

const filePattern = process.argv[2] || '*'
const paths = ls('-d', filePattern).map(f => path.parse(f))
const relevantPaths = paths.filter(p => ['.wav', '.mp3'].includes(p.ext.toLowerCase()))
const relevantFileNamesWithoutExtension = relevantPaths.map(p => p.name.toLowerCase())
if (hasDuplicates(relevantFileNamesWithoutExtension)) {
    echo('After processing there would be duplicate files names. Please make all file names unique (ignoring the extension) and try again!')
    echo('\nDuplicates: "' + findDuplicates(relevantFileNamesWithoutExtension).join('", "') + '"')
    process.exit(1)
}
relevantPaths.forEach(p => {
    const formattedPath = path.format(p)
    echo(`\n\n# Processing ${formattedPath}...\n`)
    if (p.ext.toLowerCase() === '.wav') {
        // Encode and set title
        exec(`lame --preset insane --tt "${p.name}" "${formattedPath}"`)
    } else {
        // Already MP3. Just set title.
        const tags = NodeID3.read(formattedPath) || {}
        tags.title = p.name
        NodeID3.write(tags, formattedPath)
    }
    exec(`mp3gain -r -c "${p.name}.mp3"`)
})

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length
}

function findDuplicates(array) {
    var object = {}
    var result = []
    array.forEach(function (item) {
        if (!object[item]) {
            object[item] = 0
        }
        object[item] += 1
    })
    for (var prop in object) {
        if (object[prop] >= 2) {
            result.push(prop)
        }
    }
    return result

}