export const formatSkills = (freelancerSkills, skills) => {
  let formattedSkills = { ...skills };
  // go through all skills and add new field 'checked' with default 'false'
  for (const subCategory in skills) {
    let skillsOfSubcategory = skills[subCategory];
    skillsOfSubcategory = skillsOfSubcategory.map((skill) => ({ ...skill, checked: false }));
    formattedSkills[subCategory] = skillsOfSubcategory;
  }

  // go through freelancer skills and add 'true' to the skill present
  freelancerSkills.forEach((freelancerSkill) => {
    formattedSkills[freelancerSkill.skill.sub_category] = formattedSkills[
      freelancerSkill.skill.sub_category
    ].map((skill) => (freelancerSkill.skill_id === skill.id ? { ...skill, checked: true } : skill));
  });

  return formattedSkills;
};

export const formatFreelancerSkills = (freelancerSkills, skills) => {
  let formattedSkills = { ...skills };
  // go through all skills and add new field 'checked' with default 'false'
  for (const category in skills) {
    for (const subCategory in skills[category]) {
      formattedSkills[category][subCategory] = formattedSkills[category][subCategory].map((skill) => ({
        ...skill,
        checked: false,
      }));
    }
  }

  // go through freelancer skills and add 'true' to the skill present
  freelancerSkills.forEach((freelancerSkill) => {
    formattedSkills[freelancerSkill.skill.category][freelancerSkill.skill.sub_category] = formattedSkills[
      freelancerSkill.skill.category
    ][freelancerSkill.skill.sub_category].map((skill) =>
      skill.id === freelancerSkill.skill_id ? { ...skill, checked: true } : skill,
    );
  });

  return formattedSkills;
};
