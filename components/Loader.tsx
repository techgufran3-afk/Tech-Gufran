
import React from 'react';

export const Loader: React.FC = () => {
    const messages = [
        "Warming up the time machine...",
        "Stitching pixels of the past and present...",
        "Consulting with the art directors of history...",
        "Developing your unique moment...",
        "Adding a touch of nostalgia...",
    ];
    const [message, setMessage] = React.useState(messages[0]);

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setMessage(prev => {
                const currentIndex = messages.indexOf(prev);
                const nextIndex = (currentIndex + 1) % messages.length;
                return messages[nextIndex];
            });
        }, 3000);

        return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500"></div>
            <h2 className="text-2xl font-bold text-white mt-6">Generating Your Memory</h2>
            <p className="text-gray-400 mt-2 transition-opacity duration-500">{message}</p>
        </div>
    );
};
