import React, { useState, useEffect } from 'react'
import classes from "classnames"
import { nanoid } from 'nanoid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStickyNote } from '@fortawesome/free-solid-svg-icons'

export const ChapterView = ({
    onSelectedChaptersChange = () => {},
    onChapterSelect = () => {},
    chapters,
    initialSelectedChapters = [],
    collapseAroundReadingPosition = false,
    showCommentButton = false,
    onCommentClick = () => {},
    chapterPadding = 4,
    book
} = {}) => {

    const [allChapters, setAllChapters] = useState([])

    const [expand, setExpand] = useState(false)
    const [readingPosition, setReadingPosition] = useState(undefined);

    // Run once
    useEffect(() => {
        if (chapters) {
            const chaptersWithSelect = chapters.map((chapter, index) => {
                const selected = initialSelectedChapters.some(item => item.title === chapter.title)
                return { selected, chapter, position: index + 1 }
            })
            setAllChapters(chaptersWithSelect)
            // Only run this once
            if (!allChapters.length) setReadingPosition(findReadingPosition(chaptersWithSelect))
        }
    }, [book]) // Run this everytime the book changes

    useEffect(() => {
        onSelectedChaptersChange(allChapters)
    }, [allChapters, onSelectedChaptersChange])

    // When chapter is selected, invoke callback and update local store of chapters
    const chapterSelected = item => {
        onChapterSelect({ ...item, selected: !item.selected })
        setAllChapters(allChapters.map(element => {
            if (element.chapter.title === item.chapter.title) {
                element.selected = !item.selected
            }
            return element
        }))
    }

    const buildHiddenChaptersRow = (numHidden) => {
        return (
            <tr key={nanoid()} >
                <td colSpan={100}>
                    <div className="columns is-centered is-mobile">
                        <div className="column is-narrow">
                            <span>{numHidden} chapters hidden.</span>
                            <button className="button-link" onClick={() => setExpand(true)}>Show</button>
                        </div>
                    </div>
                </td>
            </tr>
        )
    }

    const buildChapterRow = (chapterWithSelect) => {
        return (
            <tr key={nanoid()}>
                <td className={classes('is-narrow', { 'has-text-grey': !chapterWithSelect.selected })}>#{chapterWithSelect.position}</td>
                <td className={classes({ 'has-text-grey': !chapterWithSelect.selected })}>{chapterWithSelect.chapter.title}</td>
                <td className="is-narrow">
                    <label className="checkbox">
                        <input type="checkbox" defaultChecked={chapterWithSelect.selected} onClick={() => chapterSelected(chapterWithSelect)} />
                    </label>
                </td>
                {/* <td className="is-narrow">
                    <div className="button-link">
                    	<div className="icon">
                    	    <FontAwesomeIcon icon={faStickyNote}></FontAwesomeIcon>
                            <span className="pl-2">6</span>
                    	</div>
                    </div>
                </td> */}
            </tr>
        )
    }

    const buildMiddleCollapsedChapters = (chaptersWithSelect) => {
        return chaptersWithSelect.map((chapterWithSelect, index) => {
            const shouldShowChapter = expand || index < chapterPadding || index > (chaptersWithSelect.length - chapterPadding - 1)
            if (shouldShowChapter) {
                return buildChapterRow(chapterWithSelect)
            }
            if (!shouldShowChapter && index === chapterPadding) {
                return buildHiddenChaptersRow(chaptersWithSelect.length - chapterPadding * 2)
            }
            return null
        })
    }

    const buildAroundReadingPositionCollapsedChapters = () => {
        if (readingPosition === undefined || readingPosition === 0) return buildMiddleCollapsedChapters(allChapters)

        let completedChapters = []
        if (expand)
            for (let i = 0; i < readingPosition; i++)
                completedChapters.push(buildChapterRow(allChapters[i]))
        else
            completedChapters.push(buildHiddenChaptersRow(readingPosition))

        return [...completedChapters, ...buildMiddleCollapsedChapters(allChapters.slice(readingPosition, allChapters.length))]
    }

    return (
        <table className="table is-fullwidth is-hoverable">
            <tbody>
                {collapseAroundReadingPosition ? buildAroundReadingPositionCollapsedChapters() : buildMiddleCollapsedChapters(allChapters)}
            </tbody>
        </table>
    )
}

const findReadingPosition = (chaptersWithSelect) => {
    for (let i = 0; i < chaptersWithSelect.length; i++) {
        const currentChapter = chaptersWithSelect[i]
        if (currentChapter.selected === false) {
            return i;
        }
    }
}