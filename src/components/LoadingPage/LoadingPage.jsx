function LoadingPage() {
    return (
        <div className='flex flex-row justify-center items-center h-screen align-middle inset-0 bg-fixed w-full'>
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
    )
}

export default LoadingPage;