import React, { useEffect, useState } from "react";
import { Route, Switch, HashRouter, useLocation } from "react-router-dom";
import Home from "../pages/home/HomeComponent";
import Splash from "../pages/splash/Splash";
import Education from "../pages/education/EducationComponent";
import Experience from "../pages/experience/Experience";
import Contact from "../pages/contact/ContactComponent";
import Projects from "../pages/projects/Projects";
import Skills from "../pages/skills/Skills.js";
import { settings } from "../portfolio.js";

// 👇 Create a wrapper to detect route change and show splash
function RouteWithSplash({ children, theme, setTheme }) {
  const location = useLocation();
  const [loading, setLoading] = useState(settings.isSplash);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [location]);

  return loading ? <Splash theme={theme} /> : children;
}

export default function Main(propss) {
  return (
    <div>
      <HashRouter basename="/">
        <RouteWithSplash theme={propss.theme} setTheme={propss.setTheme}>
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <Home
                  {...props}
                  theme={propss.theme}
                  setTheme={propss.setTheme}
                />
              )}
            />
            <Route
              path="/home"
              render={(props) => (
                <Home
                  {...props}
                  theme={propss.theme}
                  setTheme={propss.setTheme}
                />
              )}
            />
            <Route
              path="/experience"
              render={(props) => (
                <Experience
                  {...props}
                  theme={propss.theme}
                  setTheme={propss.setTheme}
                />
              )}
            />
            <Route
              path="/skills"
              render={(props) => (
                <Skills
                  {...props}
                  theme={propss.theme}
                  setTheme={propss.setTheme}
                />
              )}
            />
            <Route
              path="/education"
              render={(props) => (
                <Education
                  {...props}
                  theme={propss.theme}
                  setTheme={propss.setTheme}
                />
              )}
            />
            <Route
              path="/contact"
              render={(props) => (
                <Contact
                  {...props}
                  theme={propss.theme}
                  setTheme={propss.setTheme}
                />
              )}
            />
            <Route
              path="/projects"
              render={(props) => (
                <Projects
                  {...props}
                  theme={propss.theme}
                  setTheme={propss.setTheme}
                />
              )}
            />
          </Switch>
        </RouteWithSplash>
      </HashRouter>
    </div>
  );
}

// import React from "react";
// import { Route, Switch, HashRouter } from "react-router-dom";
// import Home from "../pages/home/HomeComponent";
// import Splash from "../pages/splash/Splash";
// import Education from "../pages/education/EducationComponent";
// import Experience from "../pages/experience/Experience";
// import Contact from "../pages/contact/ContactComponent";
// import Projects from "../pages/projects/Projects";
// import { settings } from "../portfolio.js";

// export default function Main(propss) {
//   if (settings.isSplash) {
//     return (
//       <div>
//         <HashRouter basename="/">
//           <Switch>
//             <Route
//               path="/"
//               exact
//               render={(props) => (
//                 <Splash
//                   {...props}
//                   theme={propss.theme}
//                   setTheme={propss.setTheme}
//                 />
//               )}
//             />
//             <Route
//               path="/home"
//               render={(props) => (
//                 <Home
//                   {...props}
//                   theme={propss.theme}
//                   setTheme={propss.setTheme}
//                 />
//               )}
//             />
//             <Route
//               path="/experience"
//               exact
//               render={(props) => (
//                 <Experience
//                   {...props}
//                   theme={propss.theme}
//                   setTheme={propss.setTheme}
//                 />
//               )}
//             />
//             <Route
//               path="/education"
//               render={(props) => (
//                 <Education
//                   {...props}
//                   theme={propss.theme}
//                   setTheme={propss.setTheme}
//                 />
//               )}
//             />
//             <Route
//               path="/contact"
//               render={(props) => (
//                 <Contact
//                   {...props}
//                   theme={propss.theme}
//                   setTheme={propss.setTheme}
//                 />
//               )}
//             />
//             <Route
//               path="/splash"
//               render={(props) => (
//                 <Splash
//                   {...props}
//                   theme={propss.theme}
//                   setTheme={propss.setTheme}
//                 />
//               )}
//             />
//             <Route
//               path="/projects"
//               render={(props) => (
//                 <Projects
//                   {...props}
//                   theme={propss.theme}
//                   setTheme={propss.setTheme}
//                 />
//               )}
//             />
//           </Switch>
//         </HashRouter>
//       </div>
//     );
//   } else {
//     return (
//       <div>
//         <HashRouter basename="/">
//           <Switch>
//             <Route
//               path="/"
//               exact
//               render={(props) => (
//                 <Home
//                   {...props}
//                   theme={propss.theme}
//                   setTheme={propss.setTheme}
//                 />
//               )}
//             />
//             <Route
//               path="/home"
//               render={(props) => (
//                 <Home
//                   {...props}
//                   theme={propss.theme}
//                   setTheme={propss.setTheme}
//                 />
//               )}
//             />
//             <Route
//               path="/experience"
//               exact
//               render={(props) => (
//                 <Experience
//                   {...props}
//                   theme={propss.theme}
//                   setTheme={propss.setTheme}
//                 />
//               )}
//             />
//             <Route
//               path="/education"
//               render={(props) => (
//                 <Education
//                   {...props}
//                   theme={propss.theme}
//                   setTheme={propss.setTheme}
//                 />
//               )}
//             />
//             <Route
//               path="/contact"
//               render={(props) => (
//                 <Contact
//                   {...props}
//                   theme={propss.theme}
//                   setTheme={propss.setTheme}
//                 />
//               )}
//             />
//             <Route
//               path="/projects"
//               render={(props) => (
//                 <Projects
//                   {...props}
//                   theme={propss.theme}
//                   setTheme={propss.setTheme}
//                 />
//               )}
//             />
//           </Switch>
//         </HashRouter>
//       </div>
//     );
//   }
// }
