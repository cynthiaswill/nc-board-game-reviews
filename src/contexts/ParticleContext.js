import { createContext, useState } from "react";
import { particleOptions } from "../utils/utils";

export const ParticleContext = createContext();

export const ParticleProvider = ({ children }) => {
  const [particleOps, setParticleOps] = useState(particleOptions);

  return (
    <ParticleContext.Provider value={{ particleOps, setParticleOps }}>
      {children}
    </ParticleContext.Provider>
  );
};
