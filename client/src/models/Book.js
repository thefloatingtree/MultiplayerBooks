import { Chapter } from "./Chapter";

export class Book {
    constructor(epubData) {
        this.title = epubData.info.title
        this.author = epubData.info.author
        this.description = epubData._metadata[0]["dc:description"][0]
        this.chapters = epubData.structure.map(item => {
            return new Chapter(item)
        })
        this.completedChapterCount = 0
        this.party = []
        this.lastEdited = new Date().toISOString()
        this.created = new Date().toISOString()
    }

    removeChapter(chapter) {
        this.chapters = this.chapters.filter(item => chapter.title !== item.title)
    }
}