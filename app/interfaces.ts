interface Technique {
    id: string; // Unique identifier for the technique
    category: string; // Kodokan syllabus category (e.g., "Dai Ikkyo", "Koshi Waza")
    name: string; // English name
    japaneseName: string; // Japanese name in characters
    referenceVideos: string[]; // Array of YouTube or other video URLs
    referenceImages: string[]; // Array of image URLs
    description: string; // Detailed explanation of the technique
    keyPrinciples: string[]; // Core concepts for executing the technique (e.g., "Kuzushi", "Tsukuri", "Kake")
    commonMistakes: string[]; // Typical errors beginners make
    variations: string[]; // Names of related techniques or variations
    level: string; // Difficulty level (e.g., "Beginner", "Intermediate", "Advanced")
    history: {  // Optional: Historical context
      origin: string; // Where the technique originated
      importantFigures: string[]; // Notable Judoka associated with the technique
    };
    applications: { // Optional: Applications in different contexts
      selfDefense: string;
      competition: string;
    };
  }
  
  interface Judoka { // For a section on notable Judoka
    id: string;
    name: string;
    nationality: string;
    dob: string; // Date of birth
    rank: string; // Judo rank (e.g., "6th Dan")
    achievements: string[]; // Major titles, awards, or contributions
    image: string; // URL of a portrait image
    biography: string; // Short bio
  }
  
  interface Dojo { // If you want to list dojos
    id: string;
    name: string;
    location: {
      address: string;
      city: string;
      country: string;
    };
    contact: {
      website: string;
      email: string;
      phone: string;
    };
    sensei: string; // Name of the head instructor
    affiliations: string[]; // Organizations the dojo is affiliated with
    classesOffered: string[]; // Types of classes (e.g., "Children's Judo", "Competition Training")
    images: string[]; // URLs of dojo images
  }