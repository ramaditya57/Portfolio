import React from "react";
import "./Skills.css";
import SoftwareSkill from "../../components/softwareSkills/SoftwareSkill";
import { skills } from "../../portfolio";
import { Fade } from "react-awesome-reveal";
import FullStackImg from "./FullStackImg";
import CloudInfraImg from "./CloudInfraImg";
import DesignImg from "./DesignImg";

function GetSkillSvg(props) {
  if (props.fileName === "FullStackImg")
    return <FullStackImg theme={props.theme} />;
  else if (props.fileName === "CloudInfraImg")
    return <CloudInfraImg theme={props.theme} />;
  return <DesignImg theme={props.theme} />;
}

function SkillSection(props) {
  const theme = props.theme;
  return (
    <div>
      {skills.data.map((skill, index) => {
        const skillContent = (
          <>
            <div className="skills-text-div">
              <Fade
                left={index % 2 !== 0}
                right={index % 2 === 0}
                duration={1000}
              >
                <h1 className="skills-heading" style={{ color: theme.text }}>
                  {skill.title}
                </h1>
              </Fade>
              <Fade
                left={index % 2 !== 0}
                right={index % 2 === 0}
                duration={1500}
              >
                <SoftwareSkill logos={skill.softwareSkills} />
              </Fade>
              <Fade
                left={index % 2 !== 0}
                right={index % 2 === 0}
                duration={2000}
              >
                <div>
                  {skill.skills.map((skillSentence, i) => (
                    <p
                      key={i}
                      className="subTitle skills-text"
                      style={{ color: theme.secondaryText }}
                    >
                      {skillSentence}
                    </p>
                  ))}
                </div>
              </Fade>
            </div>

            <Fade
              left={index % 2 === 0}
              right={index % 2 !== 0}
              duration={2000}
            >
              <div className="skills-image-div">
                <GetSkillSvg fileName={skill.fileName} theme={theme} />
              </div>
            </Fade>
          </>
        );

        return (
          <div className="skills-main-div" key={index}>
            {index % 2 === 0 ? (
              <>
                {skillContent.props.children[1]}
                {skillContent.props.children[0]}
              </>
            ) : (
              skillContent
            )}
          </div>
        );
      })}
    </div>
  );
}

export default SkillSection;
