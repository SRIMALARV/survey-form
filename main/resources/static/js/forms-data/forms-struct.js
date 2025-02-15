export const formsTableStructure = {
    children: [
        { tag: 'h1', text: 'View Forms' },
        {
            tag: 'table',
            children: [
                {
                    tag: 'thead',
                    children: [
                        {
                            tag: 'tr',
                            children: [
                                { tag: 'th', text: 'Form Name' },
                                { tag: 'th', text: 'Status' },
                                { tag: 'th', text: 'Number of Responses' },
                                { tag: 'th', text: 'Actions' }
                            ]
                        }
                    ]
                },
                { tag: 'tbody', attributes: { id: 'forms-table-body' } }
            ]
        },
        {
            tag: 'div',
            attributes: { class: 'pagination' },
            children: [
                { tag: 'button', attributes: { id: 'prevPage', disabled: true }, text: 'Previous' },
                { tag: 'span', attributes: { id: 'pageInfo' }, text: 'Page 1' },
                { tag: 'button', attributes: { id: 'nextPage' }, text: 'Next' }
            ]
        }
    ]
};