import React from 'react';
import { UserLayout } from './components';

const App: React.FC = () => {
    return (
        <div className="App bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
            <UserLayout>
                hejka
            </UserLayout>
        </div>
    );
};

export default App;
