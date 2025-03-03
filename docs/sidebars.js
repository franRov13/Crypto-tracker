/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Guides',
      items: [
        'setup/index',
        'api-integ/index',
        'state-mng/index',
        'challenges/index',
      ],
    },
  ],
};

export default sidebars;