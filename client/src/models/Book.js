import wordCountFromHTMLElement from "../util/wordCountFromHTMLElement"
import { Chapter } from "./Chapter"

export class Book {
    constructor(epubData) {
        this.title = epubData?.info.title
        this.author = epubData?.info.author
        this.description = epubData?._metadata[0]["dc:description"][0]
        this.chapters = epubData?.structure.map((item, index) => {
            // Parse raw html string into an html document and then count the words
            const parser = new DOMParser()
            let chapterHTMLDocument = parser.parseFromString(epubData?.sections[index].htmlString, 'text/html')
            return new Chapter({ id: item.playOrder, title: item.name, wordCount: wordCountFromHTMLElement(chapterHTMLDocument.body) })
        })
        this.created = new Date().toISOString()
    }

    removeChapter(chapter) {
        this.chapters = this.chapters.filter(item => chapter.id !== item.id)
    }
}