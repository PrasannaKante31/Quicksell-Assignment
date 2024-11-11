import './CardHolder.css'
import { IoMdAdd } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import Card from '../Card/Card';
import UserIcon from '../UserIcon/UserIcon';
import { generateIntials, getRandomColor, priorities, statusIcons } from '../../utilities/utilities';

const CardHolder = (props) => {
    const { tickets, users, group, level, userId, order, data } = props;

    let filteredTickets = [];
    if ( group === 'priority')
        filteredTickets = tickets.filter(ticket => ticket.priority === level);
    else if (group === 'status')
        filteredTickets = tickets.filter(ticket => ticket.status.toLowerCase() === data.title.toLowerCase());
    else
        filteredTickets = tickets.filter(ticket => ticket.userId === userId);

    if (order === 'priority')
        filteredTickets = filteredTickets.slice().sort((a, b) => b.priority - a.priority);
    else
        filteredTickets = filteredTickets.slice().sort((a, b) => a.title.localeCompare(b.title));

    if (group === 'user') {
        return (
            <div className='card_holder'>
                <div className='card_holder_header'>
                    <div className="card_holder_header_name">
                        <span><UserIcon intials={generateIntials(data?.name)} available={data?.available} bgColor={getRandomColor()}/></span>
                        <p className="intials_text">{data?.name} </p>
                        <span>{filteredTickets.length}</span>
                    </div>
                    <div className="card_holder_header_options">
                        <IoMdAdd/>
                        <SlOptions/>
                    </div>
                </div>
                <div className="card_holder_container">
                    {
                        filteredTickets.map((ticket) => {
                            return (<Card
                                ticket={ticket}
                                key={ticket.id}
                                icon={priorities[ticket?.priority].icon}
                                group={group} statusIcon={statusIcons[ticket?.status.toLowerCase()].icon}
                                statusColor={statusIcons[ticket?.status.toLowerCase()].color}
                                bgColor={getRandomColor()}
                            />)
                        })
                    }
                </div>
            </div>
        )
    }
    if (group === 'priority') {
        return (
            <div className='card_holder'>
                <div className='card_holder_header'>
                    <div className="card_holder_header_name">
                        <span style={{ color: data.color }}>{data.icon}</span>
                        <p>{data.title} </p>
                        <span>{filteredTickets.length}</span>
                    </div>
                    <div className="card_holder_header_options">
                        <IoMdAdd />
                        <SlOptions />
                    </div>
                </div>

                <div className="card_holder_container">
                    {
                        filteredTickets.map((ticket) => {
                            const user = users?.find(user => user.id === ticket.userId)
                            return (
                            <Card
                                ticket={ticket}
                                key={ticket.id}
                                user={user}
                                group={group}
                                statusIcon={statusIcons[ticket?.status.toLowerCase()].icon}
                                statusColor={statusIcons[ticket?.status.toLowerCase()].color}
                                bgColor={getRandomColor()}
                                icon="" 
                            />)
                        })
                    }
                </div>
            </div>
        )
    }
    return (
        <div className='card_holder'>
            <div className='card_holder_header'>
                <div className="card_holder_header_name">
                    <span style={{ color: data.color }}>{data.icon}</span>
                    <p>{data.title} </p>
                    <span>{filteredTickets.length}</span>
                </div>
                <div className="card_holder_header_options">
                    <IoMdAdd />
                    <SlOptions />
                </div>
            </div>
            <div className="card_holder_container">
                {
                    filteredTickets.map((ticket) => {
                        const user = users?.find(user => user.id === ticket.userId)
                        return (
                        <Card
                            ticket={ticket}
                            key={ticket.id}
                            statusIcon=""
                            icon={priorities[ticket?.priority].icon}
                            user={user}
                            group={group}
                            bgColor={getRandomColor()}
                            statusColor="" 
                        />)
                    })
                }
            </div>
        </div>
    )
}

export default CardHolder