/**
 * Calculate dynamic statistics based on the current year
 * Base year: 2024 (when the project started)
 */

const BASE_YEAR = 2024;
const BASE_ORGANIZATIONS = 60;
const BASE_END_USERS = 3000; // Starting at 3k as requested
const ORGANIZATIONS_YEARLY_INCREMENT = 10;
const END_USERS_YEARLY_INCREMENT = 500;

export const calculateStats = () => {
  const currentYear = new Date().getFullYear();
  const yearsElapsed = Math.max(0, currentYear - BASE_YEAR);
  
  // Only add increments for years AFTER the base year
  const additionalYears = currentYear > BASE_YEAR ? yearsElapsed : 0;
  
  const organizations = BASE_ORGANIZATIONS + (additionalYears * ORGANIZATIONS_YEARLY_INCREMENT);
  const endUsers = BASE_END_USERS + (additionalYears * END_USERS_YEARLY_INCREMENT);
  
  return {
    organizations: `${organizations}+`,
    endUsers: endUsers >= 1000 ? `${Math.floor(endUsers / 1000)}k+` : `${endUsers}+`,
    dataAccuracy: '98%' // This remains constant
  };
};