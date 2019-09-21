module.exports = {
  '*.{js,jsx,ts,tsx}': ['yarn lint:fix', 'git add'],
  '*.scss': ['prettier --write', 'git add'],
  '{*.{json,md}}': ['prettier --write', 'git add'],
};
