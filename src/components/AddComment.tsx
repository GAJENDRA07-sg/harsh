import { SyntheticEvent, useState } from "react";

export const AddComment = ({handleSubmit}:{handleSubmit:Function}) => {

    const [comment, setComment] = useState()


    const handleChange = (event: SyntheticEvent) => {

        setComment(event.target.value)
        // handleComment()
    }

    const handleSubmitData = (e:SyntheticEvent) => {
        e.preventDefault()
        console.log(comment);
        handleSubmit({name:'Akshay Patil',comment});

    }
    return (


        <form onSubmit={handleSubmitData} className="w-full max-w-xl bg-inherit rounded-lg px-4 pt-2">
            <div className="flex flex-wrap -mx-3 mb-6">
                <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">Add a new comment</h2>
                <div className="w-full md:w-full px-3 mb-2 mt-2">
                    <textarea
                        onChange={handleChange}
                        className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                        name="comment" value={comment} placeholder='Type Your Comment' required></textarea>
                </div>
                <div className="w-full md:w-full flex items-start md:w-full px-3">
                    <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                        <svg fill="none" className="w-5 h-5 text-gray-600 mr-1" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="-mr-1">
                        <input type='submit'
                            className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                            value='Post Comment' />
                    </div>
                </div>
            </div>
        </form>
    )
}