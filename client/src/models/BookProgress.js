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

    getFirstUncompletedChapterId() {
        for (const chapterId in this.progress) {
            if (this.progress[chapterId].completed === false)
            {
                return chapterId
            }
        }
        return null
    }

    getProgressByChapterID(id) {
        return this.progress[id].completed
    }

    getCompletedWordCount() {
        let completedWordCount = 0
        for (const chapterId in this.progress) {
            completedWordCount += this.progress[chapterId].completed ? this.progress[chapterId].wordCount : 0
        }
        return completedWordCount
    }

    getCompletedChapterCount() {
        let completedChapterCount = 0
        for (const chapterId in this.progress) {
            completedChapterCount += this.progress[chapterId].completed ? 1 : 0
        }
        return completedChapterCount
    }

    getPercentage() {
        return (this.getCompletedWordCount() / this.totalWordCount) * 100
    }
}