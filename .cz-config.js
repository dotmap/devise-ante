module.exports = {
  types: [
    {value: 'feat',     name: 'feat:     A new feature'},
    {value: 'fix',      name: 'fix:      A bug fix'},
    {value: 'docs',     name: 'docs:     Documentation-only changes'},
    {value: 'style',    name: 'style:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)'},
    {value: 'chore',    name: 'chore:    Changes that neither fix a bug nor add a feature'},
    {value: 'refactor', name: 'refactor: Changes that modernize or future-proof existing code'},
    {value: 'perf',     name: 'perf:     Changes that improves performance'},
    {value: 'test',     name: 'test:     Adding missing tests'},
    {value: 'pipeline', name: 'pipeline: Changes to the build process or auxiliary tools and libraries'},
    {value: 'revert',   name: 'revert:   Revert to a commit'},
    {value: 'WIP',      name: 'WIP:      Work in progress'}
  ],
  scopeOverrides: {
    fix: [
      {name: 'bug'},
      {name: 'test'}
    ],
    chore: [
      {name: 'dependencies'}
    ],
    docs: [
      {name: 'code'},
      {name: 'usage'},
      {name: 'contributing'},
      {name: 'readme'}
    ],
    pipeline: [
      {name: 'webpack'},
      {name: 'circle'},
      {name: 'cypress'},
      {name: 'eslint'},
      {name: 'scripts'},
      {name: 'commitizen'}
    ]
  },
  messages: {
    type: 'Select the type of change that you\'re committing:',
    scope: '\nDenote the scope of this change:',
    customScope: 'Denote the scope of this change:',
    subject: 'Write a short, imperative-tense description of the change:\n',
    body: 'Provide a longer description of the change (optional). Use "|" to break a new line:\n',
    breaking: 'List any breaking changes (optional):\n',
    footer: 'List any issues closed by this change (optional). E.g.: #31, #34:\n',
    confirmCommit: 'Does this look good?'
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix']
}