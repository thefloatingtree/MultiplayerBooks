export class BookProgress {
    constructor(book) {
        this.progress = {}
        this.totalChapterCount = book?.chapters.length
        this.totalWordCount = 0;
        this.lastEdited = new Date().toISOString()
        if (book) book.chapters.forEach(chapter => {
            this.totalWordCount += chapter.wordCount
            this.progress[chapter.id] = { completed: false, wordCount: chapter.wordCount }
        })
    }

    getCompletedWordCount() {
        let completedWordCount = 0
        for (const chapter in this.progress) {
            completedWordCount += this.progress[chapter].completed ? this.progress[chapter].wordCount : 0
        }
        return completedWordCount
    }

    getCompletedChapterCount() {
        let completedChapterCount = 0
        for (const chapter in this.progress) {
            completedChapterCount += this.progress[chapter].completed ? 1 : 0
        }
        return completedChapterCount
    }

    getPercentage() {
        return (this.getCompletedWordCount() / this.totalWordCount) * 100
    }
}