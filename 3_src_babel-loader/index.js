class GirlFriend {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  say () {
    console.log(`我叫${this.name}，我今年${this.age}岁。很高兴认识你`)
  }
}

const girl = new GirlFriend('Alice',22)

girl.say()