import html2canvas from 'html2canvas';
import { Camera, Trash } from 'phosphor-react';
import { useState } from 'react';
import { Loading } from '../LoadingButton';

interface ScreenshotButtonProps{
    screenshot: string | null;
    onScreenshotTook: (screenshot: string | null) => void;
}

export function ScreenshotButton({ screenshot, onScreenshotTook }:ScreenshotButtonProps){
    const [ isTakingScreenshot, setIsTakingScreenshot ] = useState(false);

    async function handleTakeScreenshot(){
        setIsTakingScreenshot(true);
        const canvas = await html2canvas(document.querySelector("html")!);//Indica qual elemento será tirado o print (o ! no final força o TS a entender que esse elemento nunca será null).
        const base64image = canvas.toDataURL("image/png");

        onScreenshotTook(base64image);//Armazena o print no state 
        setIsTakingScreenshot(false);
    }

    if(screenshot){
        return(
            <button 
                type="button"
                className="p-1 w-10 h-10 rounded-md border-transparent flex items-end justify-end text-zinc-400 hover:text-zinc-100 transition-colors"
                style={{
                    backgroundImage: `url(${screenshot})`, 
                    backgroundPosition:"right bottom", 
                    backgroundSize: 180
                }}    
                onClick={()=> onScreenshotTook(null)}
            >

                <Trash wieght="fill"/>
            </button>
        )
    }

    return(
        <button
            type="button"
            onClick={handleTakeScreenshot}
            className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors"
        >
          { isTakingScreenshot ? <Loading/> :  <Camera className="w-6 h-6"/>}
        </button>
    )
}