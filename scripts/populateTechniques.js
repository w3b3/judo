const fs = require('fs');
const axios = require('axios');

const sourceFilePath = __dirname + '/source.json';
const apiUrl = 'https://us-central1-judo-techniques-daniel.cloudfunctions.net/addTechnique';

const defaultTechnique = {
  category: 'Unknown Category',
  name: 'Unknown Name',
  japaneseName: 'Unknown Japanese Name',
  referenceVideos: ['https://www.brzl.ca'],
  referenceImages: ['https://www.codein.ca'],
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  keyPrinciples: ['Lorem', 'Ipsum'],
  commonMistakes: ['Lorem ipsum'],
  variations: ['Lorem ipsum'],
  level: 'Beginner',
  history: {
    origin: 'Unknown Origin',
    importantFigures: ['Lorem Ipsum'],
  },
  applications: {
    selfDefense: 'Lorem ipsum dolor sit amet.',
    competition: 'Lorem ipsum dolor sit amet.',
  },
};

async function populateTechniques() {
  try {
    if (!fs.existsSync(sourceFilePath)) {
      throw new Error(`Source file not found: ${sourceFilePath}`);
    }
    const data = fs.readFileSync(sourceFilePath, 'utf8');

    const techniques = JSON.parse(data).techniques;

    for (const technique of techniques) {
      const completeTechnique = { ...defaultTechnique, ...technique };
      await axios.post(apiUrl, completeTechnique);
      console.log(`Technique ${completeTechnique.name} added successfully.`);
    }
  } catch (error) {
    console.error('Error populating techniques:', error.message);
  }
}

populateTechniques();
