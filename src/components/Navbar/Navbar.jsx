import './Navbar.css'
import { FaAngleDown } from "react-icons/fa6";
import { MdOutlineTune } from "react-icons/md";
import { useState, useEffect, useRef } from 'react';

const groupOptions = [
    { label: "Status", value: "status" },
    { label: "User", value: "user" },
    { label: "Priority", value: "priority" },
];

const orderOptions = [
    { label: "Priority", value: "priority" },
    { label: "Title", value: "title" },
];

const Navbar = ({ group, order, onGroupchange, onOrderChange }) => {
    const [expandMore, setExpandMore] = useState(false);
    const [groupedBy, setGroupedBy] = useState(group);
    const [orderedBy, setOrderedBy] = useState(order);
    const dropdownRef = useRef(null);

    const handleGroupChange = (e) => {
        setGroupedBy(e.target.value);
        onGroupchange(e.target.value);
    };

    const handleOrderChange = (e) => {
        setOrderedBy(e.target.value);
        onOrderChange(e.target.value);
    };

    const toggleDropdown = (e) => {
        e.stopPropagation(); // Prevent this click from triggering the global click listener
        setExpandMore((prev) => !prev);
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (expandMore && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setExpandMore(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [expandMore]);

    return (
        <div className='nav' ref={dropdownRef}>
            <div className='expand_btn' onClick={toggleDropdown}>
                <MdOutlineTune />
                <span>Display</span>
                <FaAngleDown />
            </div>
            {expandMore && (
                <div className="dropdown">
                    <div className='display'>
                        <p>Grouping</p>
                        <select
                            name="group"
                            id="groupBy"
                            defaultValue={group}
                            onChange={handleGroupChange}
                        >
                            {groupOptions.map((opt, i) => (
                                <option key={i} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className='display'>
                        <p>Ordering</p>
                        <select
                            name="order"
                            id="orderBy"
                            defaultValue={order}
                            onChange={handleOrderChange}
                        >
                            {orderOptions.map((opt, i) => (
                                <option key={i} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
