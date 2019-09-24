module.exports = {
  '*.{js,jsx}': ['yarn lint:fix', 'git add'],
  '*.scss': ['prettier --write', 'git add'],
  '{*.{json,md}}': ['prettier --write', 'git add'],
};
