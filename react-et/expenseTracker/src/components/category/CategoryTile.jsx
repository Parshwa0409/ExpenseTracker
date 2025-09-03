import '../../css/category/CategoryTile.css'

function CategoryTile(props){
    
    return (
        <div className="category-tile">
            <h3 className="category-tile-title">{props.category.emoji} {props.category.name}</h3>
            <h3 className="category-tile-budget">₹ {props.category.budget}</h3>
            <div className="category-tile-actions">
                <button className="btn edit" onClick={props.onEdit}>Edit</button>
                <button className="btn delete" onClick={props.onDelete}>Delete</button>
            </div>
        </div>
    );
}


export default CategoryTile;