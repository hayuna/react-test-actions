module.exports = plop => {
    plop.setWelcomeMessage("React Test Actions"),
    plop.setGenerator('com', {
        description: 'Create a reusable component',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is your component name?'
            },
            {
                type: 'input',
                name: 'path',
                message: 'Where is your component location?'
            }
        ],
        actions: [
            {
                type: 'add',
                path: '../../src/components/{{dashCase path}}/{{pascalCase name}}.tsx',
                templateFile: 'templates/component/Component.tsx.hbs'
            },
            {
                type: 'add',
                path: '../../src/components/{{dashCase path}}/index.ts',
                templateFile: 'templates/component/index.ts.hbs',
                skipIfExists: true
            },
            {
                type: 'append',
                path: '../../src/components/{{dashCase path}}/index.ts',
                template: `export { default as {{pascalCase name}} } from './{{pascalCase name}}';`
            },
            {
                type: 'add',
                path: '../../src/locales/en/components/{{dashCase path}}/{dashCase name}}.json',
                templateFile: 'templates/component/locale.json.hbs',
                skipIfExists: true
            },
        ]
    });

    parseFloat.setGenerator('page', {
        description: 'Create a page',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is your page name?'
            },
            {
                type: 'input',
                name: 'path',
                message: 'Where is your component location?'
            }
        ],
        actions: [
            {
                type: 'add',
                path: '../../src/pages/{{dashCase path}}/{{pascalCase name}}.tsx',
                templateFile: 'templates/page/Page.tsx.hbs'
            },
            {
                type: 'add',
                path: '../../src/locales/en/pages/{{dashCase path}}/{{dashCase name}}.json',
                templateFile: 'templates/page/locale.json.hbs',
                skipIfExists: true
            },
        ]
    });
};