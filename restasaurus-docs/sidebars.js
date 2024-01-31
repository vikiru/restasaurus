/**
 * Creating a sidebar enables you to:
 *
 * - Create an ordered group of docs
 * - Render a sidebar for each doc of that group
 * - Provide next/previous navigation
 *
 * The sidebars can be generated from the filesystem, or explicitly defined here.
 *
 * Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    // By default, Docusaurus generates a sidebar from the docs folder structure
    docs: [
        {
            type: 'category',
            label: 'Getting Started',
            items: ['intro', 'prerequisites', 'setup'],
        },
        {
            type: 'category',
            label: 'API Endpoints',
            items: [
                'overview',
                {
                    type: 'category',
                    label: 'General Endpoints',
                    items: [
                        'endpoints/home',
                        'endpoints/clades',
                        'endpoints/diets',
                        'endpoints/locomotions',
                        'endpoints/names',
                    ],
                },
                {
                    type: 'category',
                    label: 'Dinosaur Endpoints',
                    items: ['endpoints/allDinosaurs'],
                },
                {
                    type: 'category',
                    label: 'Image Endpoints',
                    items: ['endpoints/allImages', 'endpoints/imagesByID', 'endpoints/randomImages'],
                },
                { type: 'link', label: 'OpenAPI Spec', href: '/api' },
            ],
        },
        {
            type: 'category',
            label: 'Development',
            items: ['stack', 'run', 'test', 'scripts'],
        },
        {
            type: 'category',
            label: 'Conclusion',
            items: ['acknowledgments'],
        },
    ],
};

export default sidebars;
