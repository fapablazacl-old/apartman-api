
class PersonServiceMock {
  constructor() {
    this.persons = [
      {
        rut: '166328349',
        names: 'Felipe Andres',
        fatherName: 'Apablaza',
        motherName: 'Cheuquepan',
      },
      {
        rut: '167941028',
        names: 'Barbara Andrea',
        fatherName: 'Arbulu',
        motherName: 'Ortiz',
      },
    ]
  }

  async getAll() {
    return this.persons;
  }

  async get(id) {
    let persons = this.persons.filter((person, i) => {
      return i + 1 === id; 
    });

    if (persons.length === 0) {
      return null;
    }

    return persons[0];
  }
}

class PersonController {
  constructor() {
    this.service = new PersonServiceMock();
  }

  async get(id) {
    if (id == null) {
      return this.service.getAll();
    }

    return this.service.get(id);
  }
}

module.exports = {
  PersonController
};
