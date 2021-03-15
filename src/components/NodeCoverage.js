import React from 'react'

function NodeCoverage({nodes}) {
    let nc = nodes.map((node, index) => {
        if (node){
            return (
                <div className="flex" key={index}>
                    <label>{"-->"}</label>
                    <div className="node">
                        {index + 1}
                    </div>
                </div>
            )
        }
    })

    return(
        <div className="node-list-container">
            <h3>Nodes Covered</h3>
            <div className="node-list">
                {nc}
            </div>
        </div>
    )
}

export default NodeCoverage

