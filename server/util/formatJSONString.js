function formatJSONString(jsonString) {
    // Replace ' with ''
    // Replace "" with "\" or something like that
    return jsonString.replace(/[\r]?[\n]/g,'\\n').replace(/'/g, "''")
}

module.exports = formatJSONString