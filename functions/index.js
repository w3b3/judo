const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

/**
 * Initializes Firestore with default techniques if the collection is empty.
 */
// async function initializeFirestore() {
//   const techniquesCollection = db.collection("techniques");
//   const snapshot = await techniquesCollection.get();
//   if (snapshot.empty) {
//     const initialTechniques = [
//       {
//         category: "Dai Ikkyo",
//         name: "Hip Throw",
//         japaneseName: "O Goshi",
//         referenceVideos: ["https://www.youtube.com/watch?v=example1"],
//         referenceImages: ["https://www.example.com/image1.jpg"],
//         description: "A basic hip throw technique.",
//         keyPrinciples: ["Kuzushi", "Tsukuri", "Kake"],
//         commonMistakes: ["Not breaking balance", "Improper grip"],
//         variations: ["Uki Goshi", "Harai Goshi"],
//         level: "Beginner",
//         history: {
//           origin: "Japan",
//           importantFigures: ["Jigoro Kano"],
//         },
//         applications: {
//           selfDefense: "Effective for close-range defense.",
//           competition: "Commonly used in judo tournaments.",
//         },
//       },
//     ];
//     initialTechniques.forEach(async (technique) => {
//       await techniquesCollection.add(technique);
//     });
//     console.log("Firestore initialized with default techniques.");
//   } else {
//     console.log("Firestore already initialized.");
//   }
// }

// initializeFirestore();

const cors = require("cors")({
  origin: ["https://judo-techniques-daniel.web.app", "https://toldositajuba.com"],
});

exports.getAllTechniques = onRequest((request, response) => {
  cors(request, response, async () => { // Wrap the function logic with cors
    try {
      const techniquesSnapshot = await db.collection("techniques").get();
      const techniques = techniquesSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      response.status(200).json(techniques);
    } catch (error) {
      response.status(500).send(error.message);
    }
  });
});

const techniqueSchema = {
  category: "string",
  name: "string",
  japaneseName: "string",
  referenceVideos: "object",
  referenceImages: "object",
  description: "string",
  keyPrinciples: "object",
  commonMistakes: "object",
  variations: "object",
  level: "string",
  history: "object",
  applications: "object",
};

/**
 * Validates the technique object against the predefined schema.
 * @param {Object} technique - The technique object to validate.
 * @return {boolean} - Returns true if the technique is valid, otherwise false.
 */
function validateTechnique(technique) {
  for (const key in techniqueSchema) {
    if (Object.prototype.hasOwnProperty.call(techniqueSchema, key)) {
      if (typeof technique[key] !== techniqueSchema[key]) {
        return false;
      }
    }
  }
  return true;
}

exports.addTechnique = onRequest(async (request, response) => {
  try {
    const technique = request.body;
    if (!validateTechnique(technique)) {
      return response.status(400).send("Invalid technique schema");
    }
    await db.collection("techniques").add(technique);
    response.status(201).send("Technique added successfully");
  } catch (error) {
    response.status(500).send(error.message);
  }
});

exports.deleteTechnique = onRequest(async (request, response) => {
  try {
    const {id} = request.query;
    if (!id) {
      return response.status(400).send(id + " --> Technique ID is required");
    }
    // DocumentReference is used perform write operations.
    // DocumentSnapshot is used for reading data.
    const techniqueDocRef = await db.collection("techniques").doc(id);
    const techniqueDoc = await techniqueDocRef.get();
    if (!techniqueDoc.exists) {
      return response.status(404).send(id + " --> Technique not found");
    }
    await techniqueDocRef.delete();
    console.info("❌ techniqueDoc", techniqueDoc);
    response.status(200).send(id + " --> Technique deleted successfully");
  } catch (error) {
    response.status(500).send(error.message);
  }
});
