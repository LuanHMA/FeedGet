import { useState } from 'react';
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep'
import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'
import { FeedbackContentStep } from './Steps/FeedbackContentStep';
import { FeedbackCSuccessStep } from './Steps/FeedbackSuccessStep';

export const feedbackTypes ={
    BUG: {
        title: "Problema",
        image:{
            source:bugImageUrl,
            alt:"Imagem de um inseto"
        }
    },
    IDEA: {
        title:"Ideia",
        image:{
            source:ideaImageUrl,
            alt:"Imagem de uma lâmpada"
        }
    },
    OTHER: {
        title:"Outro",
        image:{
            source:thoughtImageUrl,
            alt:"imagem de um balão de pensamento"
        }
    },
};
export type PrimativeTypeFeedback = keyof typeof feedbackTypes//Adiciona na variavel PrimativeTypeFeedback o tipo primitivco de todo

//Object.entries(objeto) irá retornar um array com 1 array para cada chave do objeto, esse array interno conterá o nome da chave e seus atributos.

//Object.entries(feedbackTypes) => [ [BUG, {...}] , [IDEA, {...}] , [OTHER, {...}] ]

export function WidgetForm(){

    const [ feedbackType, setFeedbackType ] = useState<PrimativeTypeFeedback | null>(null);
    const [ feedbackSent, setFeedbackSent ] = useState(false);

    function handleRestartFeedback(){
        setFeedbackSent(false);
        setFeedbackType(null);
    }

    return(
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

            {feedbackSent ? (
                <FeedbackCSuccessStep onFeedbackRestartRequested={handleRestartFeedback}/> 
                
            ): (
                <>
                    {!feedbackType ? (
                    <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                    
                    ) : <FeedbackContentStep 
                            feedbackType={feedbackType} 
                            onFeedbackRestart={handleRestartFeedback} 
                            onFeedbackSent={()=> setFeedbackSent(true)}
                        />
                    }
                </>
            )}
            

            <footer className="text-xs text-neutral-400">
                Feito por <a className="underline underline-offset-2" href="https://luanHMA.github.io/Portifolio" target="_blank">Luan Henrique</a>
            </footer>
        </div>
    );
}