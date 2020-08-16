export default function wordCountFromHTMLElement(document) {
    return text(document).split(' ').length
}

// https://stackoverflow.com/questions/765419/javascript-word-count-for-any-given-dom-element
function text(el) {
    let ret = "";
    var length = el.childNodes.length;
    for(var i = 0; i < length; i++) {
        var node = el.childNodes[i];
        if(node.nodeType !== 8) {
            ret += node.nodeType !== 1 ? node.nodeValue : text(node);
        }
    }
    return ret;
}