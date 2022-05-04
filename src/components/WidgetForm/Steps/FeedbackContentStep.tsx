import { ArrowLeft} from "phosphor-react";
import { useState, FormEvent } from "react";
import { PrimativeTypeFeedback, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps{
    feedbackType: PrimativeTypeFeedback//Definie o tipo primitivo da props como a mesma do Feedback index
    onFeedbackRestart: () => void;
    onFeedbackSent: ()=> void;
}

export function FeedbackContentStep(props:FeedbackContentStepProps){

    const [ screenshot, setScreenshot ] = useState<string | null>(null);
    const [comment,setComment] = useState("");

    const feedbackTypeInfo = feedbackTypes[props.feedbackType];//Feedback escolhido pelo usuario

    function handleSubmitFeedback(event:FormEvent){
        event.preventDefault();
        console.log({screenshot,comment})

        props.onFeedbackSent();
    }

    return(
        <>
            <header>
                <button 
                    className="absolute top-5 left-5 text-zinc-400 hover:text-zinc-100"
                    onClick={props.onFeedbackRestart}
                >
                    
                    <ArrowLeft weight="bold" className="w-4 h-4"/>
                </button>

                <span className="text-xl leading-6 flex item-center gap-2" >
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6"/>
                    {feedbackTypeInfo.title}
                </span>
                <CloseButton/>
            </header>

            <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
                <textarea
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholver-zinc-400 text-zinc-100 border-2 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Conte com detalhes oque está acontecendo..."
                    onChange={event=> setComment(event.target.value)}
                />

                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton 
                        onScreenshotTook={setScreenshot} 
                        screenshot={screenshot}
                    />
                    <button
                        type="submit"
                        disabled={comment.length === 0 }
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500 disabled:cursor-not-allowed"

                    >
                        Enviar Feedback            
                    </button>

                </footer>
            </form>

            
        </>
    )
}