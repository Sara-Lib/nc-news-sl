import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom';

function SortBar({visible}) {

    const location = useLocation();
    const navigate = useNavigate();

    const options = [
        { label: 'Newest', sort_by: 'created_at', order: 'DESC' },
        { label: 'Oldest', sort_by: 'created_at', order: 'ASC' },
        { label: 'Most Votes', sort_by: 'votes', order: 'DESC' },
        { label: 'Least Votes', sort_by: 'votes', order: 'ASC' },
        { label: 'Most Comments', sort_by: 'comment_count', order: 'DESC' },
        { label: 'Least Comments', sort_by: 'comment_count', order: 'ASC' },
      ];

    const [isOpen, setIsOpen] = useState(false);

    if (!visible) return null;

    const handleSort = ({ sort_by, order }) => {
        const params = new URLSearchParams(location.search)
        params.set("sort_by", sort_by);
        params.set("order", order);
        //check if all this is needed
        navigate(`?sort_by=${sort_by}&order=${order}`);
        setIsOpen(false);
    }

    return (
    <div className="sort-bar">
      <button onClick={() => {
                setIsOpen(!isOpen)      
      }
     }>Sort articles</button>
      {isOpen && (
      <div className="dropdown-content">
      
      {options.map(({ label, sort_by, order }) => (
        <button key={label} onClick={() => handleSort({ sort_by, order })}>
            {label}
        </button>
        ))}

      </div>
      )}
    </div>
    )
}

export default SortBar;