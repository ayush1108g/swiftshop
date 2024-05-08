import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import MainContent from "./components/MainContent.tsx";
import { HashRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MainFooter from "./components/footer/mainFooter.jsx";

import DataContextProvider from "./store/context/dataContextProvider.js";
import SidebarContextProvider from "./store/context/sidebarContextProvider.js";
import CartContextProvider from "./store/context/cartContextProvider.js";
import WishContextProvider from "./store/context/wishContextProvider.js";
import LoginContextProvider from "./store/context/loginContextProvider.js";
import { AlertProvider } from "./store/context/Alert-context.js";
library.add(fas);


const App: React.FC = () => {
  return (
    <div style={{ fontFamily: 'Poppins'}}>
      <HashRouter>
        <AlertProvider>
          <LoginContextProvider>
            <AnimatePresence >
              <WishContextProvider>
                <CartContextProvider>
                  <DataContextProvider>
                    <SidebarContextProvider>
                      <MainContent />
                    </SidebarContextProvider>
                  </DataContextProvider>
                </CartContextProvider>
              </WishContextProvider>
            </AnimatePresence>
            <MainFooter />
          </LoginContextProvider>
        </AlertProvider>
      </HashRouter >
    </div>
  );
}

export default App;
