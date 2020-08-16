import React, { useState, useEffect, useRef } from 'react'
import classes from 'classnames'

export const Dropdown = ({ triggerElement, items = [], selectable = false }) => {

    const node = useRef()
    const triggerNode = useRef()
    const [dropdown, setDropdown] = useState(false)
    const [selectedElement, setSelectedElement] = useState(null)

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    useEffect(() => {
        if (items.some(item => item.selectable)) {
            setSelectedElement(items.find(item => item.selectable).element)
        } else {
            setSelectedElement(<p>No Selectable Elements</p>)
        }
    }, [])

    useEffect(() => {
        // Set trigger text to selected element text
        if (selectedElement !== null && selectable)
            triggerNode.current.children[0].children[0].innerHTML = selectedElement.props.children // This is a disgusting hack. TODO: fix it
    }, [selectedElement])

    const handleClickOutside = event => {
        if (node.current.contains(event.target)) return
        setDropdown(false)
    }

    return (
        <div ref={node} className={classes("dropdown is-right", { "is-active": dropdown })}>
            <div ref={triggerNode} className="dropdown-trigger" onClick={() => setDropdown(!dropdown)}>
                {triggerElement}
            </div>
            <div className="dropdown-menu">
                <div className="dropdown-content">
                    {items.map((item, index) => {
                        if (selectable) return item.buildSelectable(index, setSelectedElement, setDropdown)
                        else return item.build(index)
                    })}
                </div>
            </div>
        </div>
    )
}

export class DropdownTextItem {
    constructor(element) {
        this.element = element
        this.selectable = false
    }

    buildSelectable(key) { return this.build(key) }

    build(key) {
        return <div key={key} className="dropdown-item">{this.element}</div>
    }
}

export class DropdownDivderItem {
    constructor() { 
        this.selectable = false
    }

    buildSelectable(key) { return this.build(key) }

    build(key) {
        return <hr key={key} className="dropdown-divider"></hr>
    }
}

export class DropdownLinkItem {
    constructor(element, action = () => {}) {
        this.element = element
        this.action = action
        this.selectable = true
    }

    buildSelectable(key, setSelectedElement, setDropdown) {
        return <a key={key} className="dropdown-item" onClick={() => {
            setDropdown(false)
            setSelectedElement(this.element)
            this.action()
        }}>{this.element}</a>
    }

    build(key) {
        return <a key={key} className="dropdown-item" onClick={this.action}>{this.element}</a>
    }
}