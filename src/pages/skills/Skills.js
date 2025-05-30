import React, { useState, useEffect, useMemo } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import SkillCard from "../../components/SkillCard/SkillCard";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import "./Skills.css";
import { skillsData } from "../../portfolio.js";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer.js";
import { Fade } from "react-awesome-reveal";

const Skills = ({ theme, setTheme }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSkills, setFilteredSkills] = useState([]);
  // const [expandedCategory, setExpandedCategory] = useState(null); // Only one category at a time
  const [expandedCategory, setExpandedCategory] = useState([]); // Multiple category at a time
  const [isLoading, setIsLoading] = useState(true);

  const categories = useMemo(() => {
    return ["All", ...new Set(skillsData.map((skill) => skill.category))];
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = skillsData;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (skill) => skill.category === selectedCategory
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (skill) =>
          skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          skill.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredSkills(filtered);
  }, [selectedCategory, searchQuery]);

  // Single category

  // const toggleCategory = (category) => {
  //   setExpandedCategory((prev) => (prev === category ? null : category));
  // };

  // Multiple category

  const toggleCategory = (category) => {
    setExpandedCategory((prev) => {
      if (prev.includes(category)) {
        // Remove category if it's already expanded
        return prev.filter((cat) => cat !== category);
      } else {
        // Add category to expanded list
        return [...prev, category];
      }
    });
  };

  const groupedSkills = {};
  filteredSkills.forEach((skill) => {
    if (!groupedSkills[skill.category]) {
      groupedSkills[skill.category] = [];
    }
    groupedSkills[skill.category].push(skill);
  });

  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      <div className="skills-main">
        <div className="basic-skills">
          <div
            className={`skills-container ${isLoading ? "loading" : "loaded"}`}
            style={{ backgroundColor: theme.body, color: theme.text }}
          >
            <div className="skills-header">
              <h1 style={{ color: theme.text }}>Professional Skills</h1>
              <p>
                A comprehensive overview of my technical expertise and
                proficiency levels
              </p>
            </div>

            <div className="skills-controls">
              <div className="search-container">
                <Search
                  size={20}
                  className="search-icon"
                  style={{ color: theme.text }}
                />
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  style={{
                    backgroundColor: theme.projectCard,
                    color: theme.text,
                    borderColor: theme.accentColor,
                  }}
                />
              </div>

              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                theme={theme}
              />
            </div>

            <div className="skills-content">
              {Object.keys(groupedSkills).length === 0 ? (
                <div
                  className="no-skills-found"
                  style={{ color: theme.secondaryText }}
                >
                  <p>No skills found matching your criteria</p>
                </div>
              ) : (
                Object.keys(groupedSkills).map((category) => (
                  <Fade key={category} bottom duration={1200} distance="30px">
                    <div
                      key={category}
                      className="skills-category"
                      style={{
                        backgroundColor:
                          theme.name === "light"
                            ? "#ffffff"
                            : "rgba(30, 30, 30, 0.6)",
                        border:
                          theme.name === "light"
                            ? "1px solid rgba(0, 0, 0, 0.05)"
                            : "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow:
                          theme.name === "light"
                            ? "0 4px 10px rgba(0, 0, 0, 0.05)"
                            : "0 4px 20px rgba(0, 0, 0, 0.2)",
                        backdropFilter:
                          theme.name === "dark" ? "blur(10px)" : "none",
                        transition: "all 0.3s ease",
                        marginBottom: "2rem",
                        borderRadius: "0.75rem",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        className="category-header"
                        onClick={() => toggleCategory(category)}
                        style={{
                          color: theme.text,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "1.25rem 1.5rem",
                          cursor: "pointer",
                          borderBottom:
                            theme.name === "light"
                              ? "1px solid rgba(0, 0, 0, 0.05)"
                              : "1px solid rgba(255, 255, 255, 0.1)",
                          transition: "background-color 0.2s ease",
                        }}
                      >
                        <h2>{category}</h2>
                        <div
                          className="category-toggle"
                          style={{ color: theme.accentColor }}
                        >
                          {/* Single Category */}
                          {/* {expandedCategory === category ? ( */}

                          {/* Multiple Category */}
                          {expandedCategory.includes(category) ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </div>
                      </div>

                      {/* Single Category */}
                      {/* {expandedCategory === category && ( */}

                      {/* Multiple Category */}
                      {expandedCategory.includes(category) && (
                        <div className="skills-grid">
                          {groupedSkills[category].map((skill, index) => (
                            <Fade
                              triggerOnce
                              direction="up"
                              delay={index * 50}
                              key={skill.id}
                            >
                              <SkillCard
                                skill={skill}
                                index={index}
                                theme={theme}
                              />
                            </Fade>
                          ))}
                        </div>
                      )}
                    </div>
                  </Fade>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer theme={theme} />
    </>
  );
};

export default Skills;

// import React, { useState, useEffect, useMemo } from 'react';
// import { Search, ChevronDown, ChevronUp } from 'lucide-react';
// import SkillCard from '../../components/SkillCard/SkillCard';
// import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
// import './Skills.css';
// import { skillsData } from '../../portfolio.js';
// import Header from '../../components/header/Header';
// import Footer from '../../components/footer/Footer.js';
// import { Fade } from "react-awesome-reveal";

// const Skills = ({ theme, setTheme }) => {
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredSkills, setFilteredSkills] = useState([]);
//   const [expandedCategories, setExpandedCategories] = useState({});
//   const [isLoading, setIsLoading] = useState(true);

//   const categories = useMemo(() => {
//     return ['All', ...new Set(skillsData.map(skill => skill.category))];
//   }, []);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 600);

//     const initialExpandState = {};
//     categories.forEach(category => {
//       if (category !== 'All') {
//         initialExpandState[category] = true;
//       }
//     });
//     setExpandedCategories(initialExpandState);

//     return () => clearTimeout(timer);
//   }, [categories]);

//   useEffect(() => {
//     let filtered = skillsData;

//     if (selectedCategory !== 'All') {
//       filtered = filtered.filter(skill => skill.category === selectedCategory);
//     }

//     if (searchQuery) {
//       filtered = filtered.filter(skill =>
//         skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         skill.description.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredSkills(filtered);
//   }, [selectedCategory, searchQuery]);

//   const toggleCategory = (category) => {
//     setExpandedCategories(prev => ({
//       ...prev,
//       [category]: !prev[category]
//     }));
//   };

//   const groupedSkills = {};
//   filteredSkills.forEach(skill => {
//     if (!groupedSkills[skill.category]) {
//       groupedSkills[skill.category] = [];
//     }
//     groupedSkills[skill.category].push(skill);
//   });

//   return (
//     <>
//       <Header theme={theme} setTheme={setTheme} />
//       <div className="skills-main">
//         <div className="basic-skills">
//           <div
//             className={`skills-container ${isLoading ? 'loading' : 'loaded'}`}
//             style={{ backgroundColor: theme.body, color: theme.text }}
//           >
//             <div className="skills-header">
//               <h1 style={{ color: theme.text }}>Professional Skills</h1>
//               <p>A comprehensive overview of my technical expertise and proficiency levels</p>
//             </div>

//             <div className="skills-controls">
//               <div className="search-container">
//                 <Search size={20} className="search-icon" style={{ color: theme.text }} />
//                 <input
//                   type="text"
//                   placeholder="Search skills..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="search-input"
//                   style={{
//                     backgroundColor: theme.projectCard,
//                     color: theme.text,
//                     borderColor: theme.accentColor
//                   }}
//                 />
//               </div>

//               <CategoryFilter className="category-filter"
//                 categories={categories}
//                 selectedCategory={selectedCategory}
//                 onSelectCategory={setSelectedCategory}
//                 theme={theme}
//               />
//             </div>

//             <div className="skills-content">
//               {Object.keys(groupedSkills).length === 0 ? (
//                 <div className="no-skills-found" style={{ color: theme.secondaryText }}>
//                   <p>No skills found matching your criteria</p>
//                 </div>
//               ) : (
//                 Object.keys(groupedSkills).map(category => (
//                   <Fade key={category} bottom duration={1200} distance="30px">
//                     <div
//                       key={category}
//                       className="skills-category"
//                       style={{
//                         backgroundColor:
//                           theme.name === "light" ? "#ffffff" : "rgba(30, 30, 30, 0.6)",
//                         border:
//                           theme.name === "light"
//                             ? "1px solid rgba(0, 0, 0, 0.05)"
//                             : "1px solid rgba(255, 255, 255, 0.1)",
//                         boxShadow:
//                           theme.name === "light"
//                             ? "0 4px 10px rgba(0, 0, 0, 0.05)"
//                             : "0 4px 20px rgba(0, 0, 0, 0.2)",
//                         backdropFilter: theme.name === "dark" ? "blur(10px)" : "none",
//                         transition: "all 0.3s ease",
//                         marginBottom: "2rem",
//                         borderRadius: "0.75rem",
//                         overflow: "hidden",
//                       }}
//                     >
//                       <div
//                         className="category-header"
//                         onClick={() => toggleCategory(category)}
//                         style={{
//                           color: theme.text,
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "center",
//                           padding: "1.25rem 1.5rem",
//                           cursor: "pointer",
//                           borderBottom:
//                             theme.name === "light"
//                               ? "1px solid rgba(0, 0, 0, 0.05)"
//                               : "1px solid rgba(255, 255, 255, 0.1)",
//                           transition: "background-color 0.2s ease",
//                         }}
//                       >
//                         <h2>{category}</h2>
//                         <div className="category-toggle" style={{ color: theme.accentColor }}>
//                           {expandedCategories[category] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//                         </div>
//                       </div>

//                       {expandedCategories[category] && (
//                         <div className="skills-grid">
//                           {groupedSkills[category].map((skill, index) => (
//                             <Fade triggerOnce direction="up" delay={index * 50}>
//                               <SkillCard key={skill.id} skill={skill} index={index} theme={theme} />
//                             </Fade>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </Fade>
//                 ))
//               )}
//             </div>

//           </div>
//         </div>
//       </div>
//       <Footer theme={theme}></Footer>
//     </>
//   );
// };

// export default Skills;
