

const Filter = () => {
    return(
        <div className='filter-page-container'>
            <div className='filter-header'>
                <div className='filter-and-back'>
                    <button onClick={()=>navigate(-1)} className='back-btn'>←</button>
                    <p> Filter</p>
                </div>
            </div>
        </div>
    )
}

export default Filter