export class BookProgress {
    constructor(book) {
        this.progress = {}
        this.totalChapterCount = book?.chapters.length
        this.totalWordCount = 0;
        this.lastEdited = new Date().toISOString()

        if (book) book.chapters.forEach(chapter => {
            this.totalWordCount += chapter.wordCount
            this.progress[chapter.id] = this.buildProgressItem(false, chapter.wordCount)
        })
    }

    buildProgressItem(completed, wordCount) {
        return {
            completed,
            wordCount
        }
    }

    madeEdit() {
        this.lastEdited = new Date().toISOString()
    }

    setProgressByChapterId(id, value) {
        // Weird work around to solve issue with progress items being read-only
        let newProgress = {}
        let newProgressItem = this.buildProgressItem(value, this.progress[id].wordCount)
        newProgress[id] = newProgressItem
        this.progress = Object.assign({}, this.progress, newProgress)
        this.madeEdit()
        return this
    }

    getProgressByChapterID(id) {
        return this.progress[id].completed
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