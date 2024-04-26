export const Avatars = ({ src, size, children = false}) => (
    <div>
        <img src={src} className={`rounded-full ${size}`} />
        {children}
    </div>
);

export const Status = ({status, size}) => {
    const statusClass = {
        1: 'bg-green-300',
        2: 'bg-yellow-300',
        3: 'bg-red-300',
        4: 'bg-gray-300'
    }

    return (
        <div className='relative'>
            <div className={`${size} ${statusClass[status]} absolute bottom-0 right-0 rounded-full`}></div>
        </div>
    )
};