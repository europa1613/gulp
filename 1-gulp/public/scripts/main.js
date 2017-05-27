//var name = 'Arya, Stark';


class Person {
	constructor(name) {
		this.name = name;
	}

	greet() {
		if(this.name) {
			return `Hello, I am ${this.name} !`;
		} else {
			return 'Hello!'
		}
	}
}


var person = new Person('Arya');


document.write(person.greet());