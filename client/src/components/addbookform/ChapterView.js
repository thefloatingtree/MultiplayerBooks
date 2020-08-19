import React, { useState, useEffect } from 'react'
import classes from "classnames"

export const ChapterView = ({ onSelectedChaptersChange, chapters, deselectedChapters = [] } = {}) => {

    const [selectedChapters, setSelectedChapters] = useState([])
    const [expandChapters, setExpandChapters] = useState(false)

    const shownChapters = 4

    useEffect(() => {
        if (chapters) chapters.forEach(chapter => {
            const selected = deselectedChapters.some(item => item.title === chapter.title)
            setSelectedChapters(prevState => [...prevState, { selected, chapter }])
        })
    }, [])

    useEffect(() => {
        onSelectedChaptersChange(selectedChapters)
    }, [selectedChapters, onSelectedChaptersChange])

    const chapterSelected = item => {
        setSelectedChapters(selectedChapters.map(element => {
            if (element.chapter.title === item.chapter.title) {
                element.selected = !item.selected
            }
            return element
        }))
    }

    return (
        <table className="table is-fullwidth is-hoverable">
            <tbody>
                {selectedChapters.map((item, index) => {
                    if (expandChapters || index < shownChapters || index > selectedChapters.length - shownChapters - 1) {
                        return (
                            <tr key={index}>
                                <td className={classes({ 'has-text-grey': !item.selected })}>{item.chapter.title}</td>
                                <td className="is-narrow">
                                    <label className="checkbox">
                                        <input type="checkbox" defaultChecked={item.selected} onClick={() => chapterSelected(item)} />
                                    </label>
                                </td>
                            </tr>
                        )
                    } else if (index === shownChapters) {
                        return (
                            <tr key={index} >
                                <td colSpan={2}>
                                    <div className="columns is-centered is-mobile">
                                        <div className="column is-narrow">
                                            <span>{selectedChapters.length - shownChapters * 2} chapters hidden.</span>
                                            <button className="button-link" onClick={() => setExpandChapters(true)}>Show</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                    return null
                })}
            </tbody>
        </table>
    )
}