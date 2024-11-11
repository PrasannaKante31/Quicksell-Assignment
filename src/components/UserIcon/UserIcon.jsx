import './UserIcon.css'

const UserIcon = ({ intials, available, bgColor }) => {
    return (
        <div className='user'>
            <div className='user_icon' style={{ backgroundColor: bgColor }}>
                <div className='intial_text' style={{ fontSize: '0.5rem' }}>
                    {intials}
                </div>
            </div>
            <div className={`dot ${available ? 'available' : ''}`} />
        </div>
    )
}

export default UserIcon
