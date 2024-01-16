const cladeDefaults = {
    Archosauromorpha: { diet: 'carnivore', locomotionType: 'quadruped' },
    Theropoda: { diet: 'carnivore', locomotionType: 'biped' },
    Thyreophora: { diet: 'herbivore', locomotionType: 'quadruped' },
    Sauropodomorpha: { diet: 'herbivore', locomotionType: 'quadruped' },
    Sauropoda: { diet: 'herbivore', locomotionType: 'quadruped' },
    Ornithischia: { diet: 'herbivore', locomotionType: '' },
    Ornithopoda: { diet: 'herbivore', locomotionType: 'biped' },
};

const familyDefaults = {
    Ankylosauridae: { diet: 'herbivore', locomotionType: 'quadruped' },
    Ceratopsidae: { diet: 'herbivore', locomotionType: 'quadruped' },
    Galesauridae: { diet: '', locomotionType: 'quadruped' },
    Heterodontosauridae: { diet: 'herbivore', locomotionType: 'biped' },
    Hadrosauridae: {
        diet: 'herbivore',
        locomotionType: 'facultative biped',
    },
    Stegosauridae: { diet: 'herbivore', locomotionType: 'quadruped' },
    Rhopalodontidae: { diet: '', locomotionType: 'quadruped' },
    Pachycephalosauridae: { diet: 'herbivore', locomotionType: 'biped' },
    Tapinocephalidae: { diet: 'herbivore', locomotionType: 'quadruped' },
    Thescelosauridae: { diet: 'herbivore', locomotionType: 'biped' },
    Nodosauridae: { diet: 'herbivore', locomotionType: 'quadruped' },
};

const orderDefaults = {
    Ankylosauria: { diet: 'herbivore', locomotionType: 'quadruped' },
    Ceratopsia: { diet: 'herbivore', locomotionType: 'quadruped' },
    Galesauria: { diet: '', locomotionType: 'quadruped' },
    Heterodontosauria: { diet: 'herbivore', locomotionType: 'biped' },
    Hadrosauria: {
        diet: 'herbivore',
        locomotionType: 'facultative biped',
    },
    Stegosauria: { diet: 'herbivore', locomotionType: 'quadruped' },
    Rhopalodontia: { diet: '', locomotionType: 'quadruped' },
    Pachycephalosauria: { diet: 'herbivore', locomotionType: 'biped' },
    Thescelosauria: { diet: 'herbivore', locomotionType: 'biped' },
    Nodosauria: { diet: 'herbivore', locomotionType: 'quadruped' },
};

const keywords = [
    'Domain:',
    'Kingdom:',
    'Phylum:',
    'Clade:',
    'Superclass:',
    'Class:',
    'Subclass:',
    'Infraclass:',
    'Subterclass:',
    'Parvclass:',
    'Magnorder:',
    'Superorder:',
    'Grandorder:',
    'Mirorder:',
    'Order:',
    'Suborder:',
    'Infraorder:',
    'Parvorder:',
    'Family:',
    'Subfamily:',
    'Genus:',
    'Temporal range:',
    'Tribe:',
    'Type species',
    'Species',
];

const keywordRegex = /binomial|clade|class|domain|family|genus|kingdom|order|species|tribe/gim;

module.exports = {
    cladeDefaults,
    familyDefaults,
    orderDefaults,
    keywords,
    keywordRegex,
};
