import { Comment } from "@/types/types"

interface CommentProps{
    comment:Comment
}

export const CommentBox = ({comment}:CommentProps) => {



    return (
        <div className="px-6 py-2 rounded-lg ">
            <div className="md:text-lg">
                <div className="flex flex-row">
                    <p className="font-semibold mr-2">
                        {comment.name} :
                    </p>
                    {/* <div className="flex gap-3">
                        <a href="#" className=" transition-colors duration-75" target="_blank">
                            <i className="fa-brands fa-linkedin"></i>
                        </a>
                        <a href="#" className=" transition-colors duration-75" target="_blank">
                            <i className="fa-brands fa-twitter"></i>
                        </a>
                    </div> */}
                </div>

                {/* <p className=" text-sm">
                    CEO
                    <a href="#" className="hover:underline hover:cursor-pointer hover:text-blue-500 transition-colors duration-75">
                        Tech Company Z
                    </a>
                </p> */}
                <p className="text-base">
                    {comment.comment}
                </p>
            </div>
        </div>
    )
}