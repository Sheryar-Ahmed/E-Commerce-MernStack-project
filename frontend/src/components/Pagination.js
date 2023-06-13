import HelmetProvider from './SEO/Helmet';


const Pagination = ({ resultPerPage, productsCount, setcurrentPage, currentPage }) => {
    const pageCount = Math.ceil(productsCount / resultPerPage);
    return <>
        <div className='w-full flex flex-row justify-center items-center my-4'>
            <HelmetProvider 
                title='Chic Choice Maven'
            />
            <button
                onClick={() => setcurrentPage(currentPage - 1)}
                className='w-16 border rounded-lg border-blue-100 bg-blue-100 hover:bg-blue-200'
                disabled={currentPage === 1 ? true : false}
            >
                prev
            </button>
            <span
                className='w-20 border border-blue-100 text-center'>
                {currentPage} / {pageCount}
            </span>
            <button
                className='w-16 border rounded-lg border-blue-100 bg-blue-100 hover:bg-blue-200'
                disabled={currentPage === pageCount ? true : false}
                onClick={() => setcurrentPage(currentPage + 1)}
            >
                Next
            </button>
        </div>
    </>
}

export default Pagination;