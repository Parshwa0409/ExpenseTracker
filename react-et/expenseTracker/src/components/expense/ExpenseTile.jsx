import '../../css/expense/ExpenseTile.css'

function ExpenseTile(props){
    return(
        <div className="expense-tile">
            <h3 className="expens-tile-date">{props.expense.date}</h3>
            <h3 className="expens-tile-title">{props.expense.title}</h3>
            <h3 className="expens-tile-amount">₹ {props.expense.amount}</h3>
            <h3 className="expens-tile-category">{props.expense.category.emoji} {props.expense.category.name}</h3>
            <div className="expense-tile-actions">
                <button className="btn edit" onClick={props.onEdit}>Edit</button>
                <button className="btn delete" onClick={props.onDelete}>Delete</button>
            </div>
        </div>
    )
}

export default ExpenseTile;