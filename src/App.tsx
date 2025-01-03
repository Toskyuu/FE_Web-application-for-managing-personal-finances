import React from 'react';
import Header from '@/components/Layout/Header/Header';
import FloatingButtons from "@/components/Elements/FloatingButtons/FloatingButtons";

const App: React.FC = () => {
    return (
        <div className="App">
            <Header />
            <FloatingButtons />
        </div>
    );
};

export default App;
