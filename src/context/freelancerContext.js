import { useState, createContext } from 'react';

export const FreelancerContext = createContext();

export const FreelancerProvider = ({ children }) => {
  const [contracts, setContracts] = useState([]);
  const [opportunities, setOpportunities] = useState([]);

  // Manage Freelancer Skills
  const [freelancerSkills, setFreelancerSkill] = useState({});
  const [updatedSkills, setUpdatedSkills] = useState({});

  return (
    <FreelancerContext.Provider
      value={{
        contracts,
        setContracts,
        opportunities,
        setOpportunities,

        freelancerSkills,
        setFreelancerSkill,
        updatedSkills: Object.keys(updatedSkills).map((id) => updatedSkills[id]),
        setUpdatedSkills,
      }}
    >
      {children}
    </FreelancerContext.Provider>
  );
};
