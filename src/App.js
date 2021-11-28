import React, { useEffect, useRef, useState } from "react"

import Overlay from "./components/Overlay"
import Cursor from "./components/Cursor";
import CanvasWrapper from "./components/Canvas";

import ScrollContext from "./context/ScrollContext";
import DepthContext from "./context/DepthContext";
import TargetContext from "./context/TargetContext";
import CursorContext from "./context/CursorContext";


function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [target, setTarget] = useState(null)
  const [cursorProps, setCursorProps] = useState(null)

  const scroll_value = {scrollProgress, setScrollProgress}
  const target_value = {target, setTarget}
  const cursor_value = {cursorProps, setCursorProps}

  const overlay = useRef()
  const caption = useRef()
  
  return (
    <div className="body-container">
      <ScrollContext.Provider value={scroll_value}>
        <DepthContext.Provider value={200}>
          <TargetContext.Provider value={target_value}>
            <CanvasWrapper overlay={overlay} />
            <CursorContext.Provider value={cursor_value}>
              <Overlay ref={overlay} caption={caption} />
              <Cursor/>
            </CursorContext.Provider>
          </TargetContext.Provider>
        </DepthContext.Provider>
      </ScrollContext.Provider>
    </div>
  );
}

export default App;