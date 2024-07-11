import React from 'react'
import Markdown from 'react-markdown'
// import Markdown1 from 'markdown-to-jsx'

const CustomMarkdown = ({ children }: any) => {
    return (
        <Markdown>
            {children}
        </Markdown>
    )
}

export default CustomMarkdown