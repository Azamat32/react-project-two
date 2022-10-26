export default class GotService {
  constructor() {
    this._apiBase = "https://www.anapioficeandfire.com/api";
  }

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(
        `Could not get resource ${url}` + `,reseived status ${res.status}`
      );
    }

    return await res.json();
  }

  async getAllCharacters() {
    const result = await this.getResource("/characters?page=5&pageSize=10");
    return result.map(this._transformCharacter);
  }
  async getCharacter(id) {
    const character = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(character);
  }
  async getAllHouses() {
    const result = await this.getResource("/houses/");
    return result.map(this._transformHouses);
  }
  async getHouse(id) {
    const House = await this.getResource(`/houses/${id}`);
    return this._transformHouses(House);
  }
  getAllBooks() {
    return this.getResource("/books/");
  }
  getBook(id) {
    return this.getResource(`/books/${id}`);
  }

  _transformCharacter(char) {
    return {
      name: char.name,
      gender: char.gender,
      born: char.born,
      died: char.died,
      culture: char.culture,
    };
  }

  _transformHouses(house) {
    return {
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons,
    };
  }

  _transformBook(book) {
    return {
      name: book.name,
      numberOfPages: book.numberOfPages,
      publisher: book.publisher,
      released: book.released,
    };
  }
}
