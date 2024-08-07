import './App.css';
import Header from './components/header/header';
import History from './components/History/History';
import Login from './components/login/login';
import SearchBar from './components/SearchBar/SearchBar';
import SessionQuery from './components/session/sessnionQuery';

function App() {
  return (
    <div className="w-[100vw] h-[100vh] max-sm:h-screen bg-dark-grey">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Sidebar (visible on larger screens) */}
        <div className="lg:w-1/4 bg-black mr-5 lg:ml-5 mt-5 lg:mb-5 rounded max-lg:w-full flex flex-col">
          {/* Header (hidden on screens 1024px or smaller) */}
          <div className="max-lg:hidden">
            <Header />
          </div>
          {/* History (hidden on screens 1024px or smaller) */}
          <div className="max-lg:hidden mb-5 flex-grow">
              <History />
          </div>
          {/* Login (hidden on screens 1024px or smaller) */}
          <div className="max-lg:hidden mb-5">
            <Login />
          </div>
          {/* On screens 1024px or smaller, display these items */}
          <div className="lg:hidden flex flex-column w-ful h-[10vh] items-center mx-5">
            <div className="w-full left-0">
              <Header />
            </div>
            <div className="w-full right-0 ">
              <Login />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-black m-5 rounded flex flex-col">
          <div className="flex-1 h-full">
            <div className="h-[75vh] max-sm:h-[60vh] max-lg:h-[60vh] flex-grow">
              <SessionQuery />
            </div>
          </div>
          <div className="flex items-center justify-between h-1/6 ">
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
