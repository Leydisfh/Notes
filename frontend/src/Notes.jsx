

export const Note = ({content, toggleImportance}) => {
    const label = content.important ? 'make not important' : 'make important';
   return (
    <li className="note">
        <p>
            {content}
        </p>
        <button onClick={toggleImportance}>{label}</button>
    </li>
)}