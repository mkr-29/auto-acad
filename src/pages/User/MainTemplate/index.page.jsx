import React from 'react'
import "./mainTemplate.scss";

export default function MainTemplate() {
    return (
        <div class="main-template">
            <h2>Main Template</h2>
            <div className="template-item">
                <div className="short-box">
                    <span class="menu-handle">⋮⋮</span>
                    <span class="template-name">template_name</span>
                </div>
                <button class="menu-button">⋮</button>
                <ul class="menu">
                <li>View</li>
                <li>Edit</li>
                <li class="delete">Delete</li>
                <li>Download</li>
            </ul>
            </div>
            <div className="add-template">Add Template +</div>
        </div>
        
    )
}