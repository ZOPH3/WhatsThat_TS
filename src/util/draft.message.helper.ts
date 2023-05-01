//TODO: Deal with saving the messages to storage, would need to take message + chat_id. If it has been sent or scrapped, delete it.

const sendDraft = (draft_id: number, chat_id: number) => {
    console.log("Send Draft");
}
const deleteDraft = (chat_id: number) => { 
    console.log("Delete Draft");
}
const loadDraft = (chat_id: number) => {
    console.log("Loading Drafts");
}
const saveDraft = (chat_id: number, message: string) => {
    console.log("Save Draft");
}

export {saveDraft, sendDraft, deleteDraft, loadDraft};