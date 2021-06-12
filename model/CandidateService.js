import { GetHRId, GetPersistData, PersistData } from "./UtilityFunctions";

class CandidateService {
  constructor() {
    this.candidates = [];
    this.nextId = this.candidates.length + 1;
  }

  addCandidate = async ({ name, surname, email, city, country, avatarUrl }) => {
    try {
      let currentHR = GetHRId();
      const candidateList = await this.fetchCandidates();
      if (Array.isArray(candidateList)) {
        const id = candidateList.length + 1;
        const newCandidateInfo = {
          name,
          surname,
          email,
          city,
          country,
          avatarUrl,
          id,
        };
        candidateList.push(newCandidateInfo);
        console.log(candidateList, "mmmm");
        PersistData(`CANDIDATES-INFO-${currentHR}`, candidateList);

        return newCandidateInfo;
      }
    } catch (error) {
      return false;
    }
  };

  updateCandidate = async ({
    id,
    name,
    surname,
    email,
    city,
    country,
    avatarUrl,
  }) => {};

  removeCandidate = async (id) => {};

  fetchCandidates = async () => {
    let currentHR = GetHRId();
    let Candidates = await GetPersistData(`CANDIDATES-INFO-${currentHR}`);
    console.log(Candidates, "Candidates");
    return Candidates;
  };

  fetchDetails = async (id) => ({});
}

export default CandidateService;
