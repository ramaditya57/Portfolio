import React, { useState } from "react";
import "./SkillCard.css";

const SkillCard = ({ skill, index, theme }) => {
  const [isHovered, setIsHovered] = useState(false);

  const animationDelay = `${index * 0.05}s`;

  const cardStyle = {
    animationDelay,
    backgroundColor: isHovered ? theme.projectCard : "transparent",
    color: theme.text,
    borderColor: theme.accentColor,
  };

  const placeholderBg = `hsl(${index * 30}, 70%, 60%)`;

  return (
    <div
      className={`skill-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={cardStyle}
    >
      <div className="skill-icon">
        {skill.icon || (
          <div
            className="skill-icon-placeholder"
            style={{ backgroundColor: placeholderBg, color: theme.body }}
          >
            {skill.name.charAt(0)}
          </div>
        )}
      </div>

      <div className="skill-content">
        <h3 className="skill-name" style={{ color: theme.text }}>
          {skill.name}
        </h3>
        <p className="skill-description" style={{ color: theme.secondaryText }}>
          {skill.description}
        </p>
      </div>

      <div className="skill-proficiency">
        <div
          className="proficiency-label"
          style={{ color: theme.secondaryText }}
        >
          Proficiency
        </div>
        <div
          className="proficiency-bar-container"
          style={{ backgroundColor: theme.body }}
        >
          <div
            className="proficiency-bar"
            style={{
              width: `${skill.proficiency}%`,
              backgroundColor: theme.accentColor,
            }}
          />
          <div className="proficiency-ticks">
            {[0, 25, 50, 75, 100].map((tick) => (
              <div
                key={tick}
                className={`proficiency-tick ${
                  skill.proficiency >= tick ? "active" : ""
                }`}
                style={{
                  left: `${tick}%`,
                  backgroundColor:
                    skill.proficiency >= tick
                      ? theme.accentBright
                      : theme.projectCard,
                }}
              />
            ))}
          </div>
        </div>
        <div
          className="proficiency-level"
          style={{ color: theme.accentBright }}
        >
          {getProficiencyLabel(skill.proficiency)}
        </div>
      </div>

      {skill.yearsOfExperience && (
        <div
          className="experience-badge"
          style={{
            backgroundColor: theme.accentBright,
            color: theme.body,
          }}
        >
          {skill.yearsOfExperience}{" "}
          {skill.yearsOfExperience === 1 ? "year" : "years"}
        </div>
      )}
    </div>
  );
};

// Helper function to get proficiency label
const getProficiencyLabel = (percentage) => {
  if (percentage >= 90) return "Expert";
  if (percentage >= 70) return "Advanced";
  if (percentage >= 40) return "Intermediate";
  return "Beginner";
};

export default SkillCard;
